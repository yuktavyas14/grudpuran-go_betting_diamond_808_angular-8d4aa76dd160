import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { Globals } from 'src/app/core/model/global';
import { User } from 'src/app/core/model/user';

declare const $:any;
@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss']
})
export class AuthHeaderComponent implements OnInit {
  loginForm: FormGroup
  logo;
  isSignUp:any='0'
  isApk:any='0'
  constructor(private renderer: Renderer2,private fb:FormBuilder,
    private service:AuthService,private route:Router ,
    private toaster:ToastrService,private userservice:UserService) { }

  ngOnInit(): void {
    $(window).scroll(function() {
      var sticky = $('.main-navbar'),
        scroll = $(window).scrollTop();
    
      if (scroll >= 50) sticky.addClass('fixed');
      else sticky.removeClass('fixed');
    });
    
    this.userservice.getSetting().subscribe(res => {
      if(res.status){
        this.logo = `${Globals.Url}/api/upload/image/` + res?.data?.logo;
        this.isSignUp= res?.data?.sign_up || '0';
        this.isApk= res?.data?.is_show_apk || '0';

        console.log(this.isSignUp)
      }
    })
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
  closeLoginModal(){
    $('#loginpopup').modal('hide');
  }
  Login(datao: any) {
     console.log(this.loginForm.invalid ,"invalid", this.loginForm.value)
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
          $('#loginpopup').modal('hide');
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
  
}
