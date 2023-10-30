import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { SignupComponent } from './signup/signup.component';

export const authenticationRoute:Routes = [
  {path:'',
redirectTo:'login',
pathMatch:'full'
},
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'otp',
    component:OtpComponent
  }
]
