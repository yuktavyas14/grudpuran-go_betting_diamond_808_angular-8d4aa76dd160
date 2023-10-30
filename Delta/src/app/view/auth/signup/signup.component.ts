import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component,  OnDestroy, OnInit, Renderer2} from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MatchService } from 'src/app/core/services/match.service';
import { Globals } from 'src/app/core/model/global';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  flagExits : Boolean = false;
  signupForm: FormGroup;
  errorMessage : any;
  logo:any;
  isSignUp:any='0'
  isApk:any=0
  private userNameRegex = new RegExp('^[a-z0-9_-]{4,15}$');
  constructor(public userService: UserService, private renderer: Renderer2,
    private fb:FormBuilder,private service:AuthService,private route:Router ,
    private toaster:ToastrService, private matchService : MatchService,) { 
    this.signupForm = this.fb.group(
      {
        'user_name'         : ["",[Validators.required, Validators.pattern(this.userNameRegex)]],
        'password'          : ["",[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)  ]],
        'name'              : ["", Validators.required],
        'mobile'            : ["",  [Validators.required, Validators.minLength(10),Validators.maxLength(12)]],
        'confirm_password'  : ["" ,[Validators.required]],
        'referal_code'      :[''] ,
      },{
        validator: ConfirmPasswordValidator("password", "confirm_password")
      }
    )
  }
  

  ngOnInit(): void {
    this.matchService.getSetting().subscribe(res => {
      if(res.status){
        this.logo = `${Globals.Url}/api/upload/image/` + res?.data?.logo;
        this.isSignUp= res?.data?.sign_up || '0';
        this.isApk= res?.data?.is_show_apk || '0';
      }
    })
    // this.renderer.setStyle(document.body, 'background-color', '#6a9a1f');
   

    this.signupForm?.get("user_name")?.valueChanges.subscribe(x => {
      if( this.signupForm.controls['user_name'].value == ''){
        this.flagExits = false;
      }
   })
  }

  Signup() {
    if(this.signupForm.invalid){
      this.signupForm.markAllAsTouched()
      return
    }
    this.service.signup(this.signupForm.value).subscribe((data) => {
    
      if (data.status) {
        this.toaster.success(data?.message)
       this.route.navigate(['/auth/login'])
      } else {
        this.toaster.error(data.message.toString());
      
      }
    })
  }

  checkUserExist(){
    // debugger
   let payload ={
     user_name: this.signupForm.controls['user_name'].value
   }
   if(this.signupForm.controls['user_name'].value){
   this.userService.checkExistUser(payload).subscribe((res)=>{
     if(!res?.status){
     this.flagExits = true;
     } else {
       this.flagExits = false;
     }
   })
  }
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
    // or whatever color you want to change when user move out of login page
  }

  // Only Integer Numbers
  keyPressNumbers(event : any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }


 

  // password(formGroup: FormGroup) {
  //   const { value : password } = formGroup.get('password');
  //   const { value: confirmPassword } = formGroup.get('confirm_password');
  //   return password === confirmPassword ? null : { passwordNotMatch: true };
  // }


//   pwdConfirming(formGroup: FormGroup) {
//     return (group: FormGroup) => {
//         const input = formGroup.get('password');
//         const confirmationInput = group.controls[confirmationKey];
//         return confirmationInput.setErrors(
//             input.value !== confirmationInput.value ? {notEquivalent: true} : null
//         );
//     };
// }
}


export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName]
    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmPasswordValidator
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}