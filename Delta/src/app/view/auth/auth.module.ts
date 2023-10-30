import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './otp/otp.component';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';
// import { RouterModule } from '@angular/router';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    OtpComponent,
    AuthHeaderComponent, AuthFooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // ToastrModule.forRoot(),
    AuthRoutingModule,
    AuthRoutingModule,
    NgOtpInputModule
  ],
  providers: [AuthService, ApiService]
})
export class AuthModule { }
