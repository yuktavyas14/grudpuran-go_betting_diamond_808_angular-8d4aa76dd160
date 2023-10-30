import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { authenticationRoute } from './auth.routing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';


@NgModule({
  declarations: [LoginComponent, SignupComponent, OtpComponent, AuthHeaderComponent, AuthFooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgOtpInputModule,
    RouterModule.forChild(authenticationRoute)
  ]
})
export class AuthModule { }
