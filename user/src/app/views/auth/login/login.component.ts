// import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/model/user';
import { ToastrService } from 'ngx-toastr';
import { Component,  OnDestroy, OnInit, Renderer2} from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Globals } from 'src/app/core/model/global';
declare const $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit , OnDestroy{
  origin:any;

  constructor(private renderer: Renderer2,private fb:FormBuilder,
    private service:AuthService,private route:Router ,
    private toaster:ToastrService,private userservice:UserService) {
      this.origin = document.location.hostname;

     }
  loginForm: FormGroup
  logo;
  isSignUp:any='0'
  isApk:any='0'
  ngOnInit(): void {
    this.userservice.getSetting().subscribe(res => {
      if(res.status){
        this.logo = `${Globals.Url}/api/upload/image/` + res?.data?.logo;
        this.isSignUp= res?.data?.sign_up || '0';
        this.isApk= res?.data?.is_show_apk || '0';

        console.log(this.isSignUp)
      }
    })
    // this.renderer.setStyle(document.body, 'background-color', '#6a9a1f');


    this.loginForm = this.fb.group(
      {
        'user_name': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
      }
    )

  }
  openLoginModal(){
    $('#loginpopup').modal('show');
  }
  Login(datao: any) {
  // console.log(this.loginForm.invalid ,"invalid", this.loginForm.value)
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
     return;
     }
    let data ={
      'user_name': this.loginForm.controls['user_name'].value,
      'password':this.loginForm.controls['password'].value,
      'type':"C"
    }


    this.service.login(data).subscribe((data:any) => {
   
      if (data.status && data.data.user_type_id == 7) {
        if(data.status && data.data.is_telegram_enabled == '0'){
        this.route.navigate(['/main'])
        const user = new User()
        user.setData(data.data)
        localStorage.setItem('logedIn',JSON.stringify('true'))
        user.setToken(data.data.token.toString())
        }else{
          const user = new User()
          user.setData(data.data)
          localStorage.setItem('logedIn',JSON.stringify('true'))
          user.setToken(data.data.token.toString())
          localStorage.setItem('userId',data.data.user_id)
          this.route.navigate(['/auth/otp'])
        }
        // this.toaster.successToastr("Login Succefull !")
      } else {
        this.toaster.error(data.message.toString());
        // console.log("Error", data.message)
      }
       
    })
  }


  getUrlReplace(url:any){
    let result = url.replace(/(^\w+:|^)\/\//, '');
    return result;
  }
  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
    // or whatever color you want to change when user move out of login page
  }


}
