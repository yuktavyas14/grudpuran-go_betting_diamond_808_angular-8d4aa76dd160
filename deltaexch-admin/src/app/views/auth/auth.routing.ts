import { Routes } from '@angular/router'
import { Component } from '@angular/core'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { OtpComponent } from './otp/otp.component'

export const authenticationRouting : Routes = [
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
