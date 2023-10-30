import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/model/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  useradmininfo = new User()?.getData();

  updateForm: FormGroup;
  constructor(private service: UserService, private fb: FormBuilder ,private toaster:ToastrService) { }

  ngOnInit(): void {
    if(this.useradmininfo.user_type_id =='1'){
      this.updateForm = this.fb.group({
        old_password: new FormControl('', Validators.required),
        new_password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)  ]),
        confirm_password: new FormControl('', Validators.required),
        master_password: new FormControl('', Validators.required)
      })
    }
  
    if(this.useradmininfo.user_type_id !='1'){
      this.updateForm = this.fb.group({
        new_password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)  ]),
        confirm_password: new FormControl('', Validators.required),
        master_password: new FormControl('', Validators.required)
      })
    }

  }


  updatePassword(){
   
    this.service.changePassword(this.updateForm.value).subscribe((res)=>{
      if(res.status){
        this.useradmininfo.is_change_password ='0';
        const user = new User()
        user.setData(this.useradmininfo)

         this.toaster.success(res?.message);
      }else{
        this.toaster.error(res?.message);

      }
    })
  }

}
