import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
// import { NgOtpInputModule } from 'ng-otp-input';
import { authenticationRouting } from './auth.routing';
import { SignupComponent } from './signup/signup.component'
import { AuthService } from 'src/app/core/services/auth.service';
import { OtpComponent } from './otp/otp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { NgOtpInputModule } from 'ng-otp-input';



@NgModule({
  declarations: [LoginComponent, SignupComponent,OtpComponent],
  imports: [
  
  CommonModule,
    FormsModule, ReactiveFormsModule,
    // NgOtpInputModule,
        RouterModule.forChild(authenticationRouting)
  ],
  providers: [AuthService]
})
export class AuthModule { }
