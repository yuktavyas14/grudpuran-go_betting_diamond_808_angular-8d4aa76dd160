import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePass : FormGroup
  userDetails     : any      = JSON.parse(localStorage.getItem('userinfo') || 'null');

  constructor(private router: Router, private fb:FormBuilder,private service:UserService , private toster: ToastrService)  { 
    this.changePass = this.fb.group({
      master_password: new FormControl('',Validators.required),
      new_password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/) ]),
      confirm_password: new FormControl('',[Validators.required ])
    })
  }
  // , { validators: this.checkPasswords }
  // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)  ]
  ngOnInit(): void {
 
  }

  // convenience getter for easy access to form fields
  get f() { return this.changePass.controls; }

  changePassword(){
     // stop here if form is invalid
     if (this.changePass.invalid) {
       this.changePass.markAllAsTouched()
      return true;
      }
    this.service.updatePassword(this.changePass.value).subscribe((res :any)=>{
      if(res?.status){
       this.toster.success(res?.message);
       this.changePass.reset()
        if(this.userDetails?.is_change_password == 1){
          this.userDetails['is_change_password'] = 0;
          localStorage.setItem('userinfo', JSON.stringify(this.userDetails));
        }
       this.router.navigate(['/main']).then(() => {
          window.location.reload();
        });
      }else{
        this.toster.error(res?.message);
      }
    })

  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password         = group.get('new_password')?.value;
    const confirmPassword  = group.get('confirm_password')?.value;
  
    return password === confirmPassword ? null : { notSame: true }     
  }


//   public static matchValues(
//     matchTo: string // name of the control to match to
//   ): (AbstractControl) => ValidationErrors | null {
//     return (control: AbstractControl): ValidationErrors | null => {
//       return !!control.parent &&
//         !!control.parent.value &&
//         control.value === control.parent.controls[matchTo].value
//         ? null
//         : { isMatching: false };
//     };
// }

//  passwordMatch(formGroup: FormGroup): ValidationErrors | undefined {
//   const passwordControl = formGroup.get('new_password');
//   const confirmPasswordControl = formGroup.get('confirm_password');

//   if(passwordControl?.value == confirmPasswordControl?.value){
//     return null;      
//   } else {
//     return {
//       passwordMatch: true
//     }
//   }
// }

}