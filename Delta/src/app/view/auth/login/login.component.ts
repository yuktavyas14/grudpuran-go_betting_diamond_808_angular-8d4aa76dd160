import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Globals } from 'src/app/core/model/global';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatchService } from 'src/app/core/services/match.service';
declare const $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm    :FormGroup;
  isSubmitted  :boolean   =  false
  loading      :boolean   =  false;
  errorMessage : any;
  logo:any;
  origin:any;
  isSignUp:any='0'
  isApk:any=0

    constructor(private formBuilder: FormBuilder, private authService : AuthService, 
      private tosterService : ToastrService, private router : Router,
      private matchService : MatchService,) { 
        this.origin = document.location.hostname;
        this.loginForm = this.formBuilder.group({
            user_name : ['',  [Validators.required]],
            password  : ['',  [Validators.required]]
        });
        this.globalConstant();
    }


  ngOnInit(): void {
    // this.logo = Globals.Url + '/uploads/logo.png';
    this.matchService.getSetting().subscribe(res => {
      if(res.status){
        this.logo = `${Globals.Url}/api/upload/image/` + res?.data?.logo;
        this.isSignUp= res?.data?.sign_up || '0';
        this.isApk= res?.data?.is_show_apk || '0';
      }
    })
    // if(localStorage.getItem('token') && localStorage.getItem('userinfo') && this.authService.isLoggedIn){
    //   this.router.navigate(['/main'])
    // }
  }
  openLoginModal(){
    $('#loginpopup').modal('show');
  }
 
   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

  login(data : any){
     // stop here if form is invalid
     if (this.loginForm.invalid) {
       this.loginForm.markAllAsTouched()
      return;
      }
    data['type'] = 'C'
      
    this.authService.login(data).subscribe((res :any) => {
      if (res?.status && res?.data?.user_type_id == 7) {
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
  globalConstant() {
    this.matchService.globalConstant().subscribe(response => {
      this.logo= response.data.logo;

    }, error => {
    });
  }
  getUrlReplace(url:any){
    let result = url.replace(/(^\w+:|^)\/\//, '');
    return result;
  }
}
