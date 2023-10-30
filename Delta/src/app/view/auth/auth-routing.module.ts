import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path:'login',
      component: LoginComponent
    },
    {
      path:'signup',
      component: SignupComponent
    },
    {
      path:'otp',
      component:OtpComponent
    }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
