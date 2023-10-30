import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb:FormBuilder,private service:UserService, private toaster:ToastrService) { }
  changePass : FormGroup
  ngOnInit(): void {
  this.changePass = this.fb.group({
    master_password: new FormControl('',Validators.required),
    new_password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])[A-Za-z\d@$!%*#?&]{8,}$/)  ]),
    // new_password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)  ]),
    confirm_password: new FormControl('',Validators.required)
  })
  }

  changePassword(){
    this.service.updatePassword(this.changePass.value).subscribe((res)=>{
      if(res?.status){
       this.toaster.success(res?.message);
       this.changePass.reset()
      }else{
        this.toaster.error(res?.message);
      }
    })

  }
}
