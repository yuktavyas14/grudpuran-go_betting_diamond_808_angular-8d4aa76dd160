import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { Globals } from 'src/app/core/model/global';
import { User } from 'src/app/core/model/user';
import { MatchService } from 'src/app/core/services/match.service';

declare const $:any;
@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss']
})
export class AuthHeaderComponent implements OnInit {
  loginForm: FormGroup
  logo:any;
  isSignUp:any='0'
  isApk:any='0'
  isSubmitted  :boolean   =  false
  loading      :boolean   =  false;
  errorMessage : any;
 
  constructor(private fb: FormBuilder, private authService : AuthService, 
    private tosterService : ToastrService, private router : Router,
    private matchService : MatchService) {
      this.loginForm = this.fb.group(
        {
          'user_name': new FormControl('', Validators.required),
          'password': new FormControl('', Validators.required),
        }
      )
     }

  ngOnInit(): void {
    $(window).scroll(function() {
      var sticky = $('.main-navbar'),
        scroll = $(window).scrollTop();
    
      if (scroll >= 50) sticky.addClass('fixed');
      else sticky.removeClass('fixed');
    });
    
    this.matchService.getSetting().subscribe(res => {
      if(res.status){
        this.logo = `${Globals.Url}/api/upload/image/` + res?.data?.logo;
        this.isSignUp= res?.data?.sign_up || '0';
        this.isApk= res?.data?.is_show_apk || '0';

        console.log(this.isSignUp)
      }
    })

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
  
  
      this.authService.login(data).subscribe((res :any) => {
        if (res?.status && res?.data?.user_type_id == 7) {
        $('#loginpopup').modal('hide');

          if(res.data.is_telegram_enabled == '0'){
          const user = new User()
          user.setData(res?.data)
          user.setToken(res?.data.token.toString())
          if(res?.data?.is_change_password =='1'){
            this.router.navigate(['/main/chage-password'])     
          } else{
            localStorage.setItem('openWelcomePopup','true')
            this.router.navigate(['/main'])
          }
        }else{
          const user = new User()
          user.setData(res?.data)
          localStorage.setItem('userId',res?.data.user_id)
          user.setToken(res?.data.token.toString())
          this.router.navigate(['/otp'])
          
        }
        } else {
          this.errorMessage = res?.message.toString()
          this.tosterService.error(res?.message.toString());
        }
      })
    }
  
}
