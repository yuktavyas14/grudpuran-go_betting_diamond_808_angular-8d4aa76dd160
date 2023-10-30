import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  favurl
  url
  gloabalData
  origin:any;
  user:any;
  constructor(private matchservice : MatchService, private fb:FormBuilder,private service:AuthService,private route:Router,private toaster:ToastrService) {
    this.origin = document.location.origin;
  }
  loginForm: FormGroup;
  location='';
  ngOnInit(): void {
    this.user = new User();
    if (this.user.isLoggedIn() && (this.user.getData())) {
     this.route.navigate(['/main/marketAnalysis'])
    }
    this.loginForm = this.fb.group(
      {
        'user_name': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
      }
    )
    this.getGlobalSetting()

  }

  Login() {
    let currentPosition:any =  localStorage.getItem('getCurrentLocation');
    if(currentPosition != "undefined" && currentPosition != null && currentPosition!='' &&  currentPosition != 'null'){
      this.location=currentPosition;
    }
    let data ={
      'user_name': this.loginForm.controls['user_name'].value,
      'password':this.loginForm.controls['password'].value,
      location:this.location,
      'type':"A"
    }


    this.service.login(data).subscribe((data:any) => {
      if (data.status && data.data.user_type_id != 7) {
        if(data.status && data.data.is_telegram_enabled == '0'){

        // alert()
        const user = new User()
        user.setData(data.data)
        user.setToken(data.data.token.toString())
        this.route.navigate(['/main/marketAnalysis']);
        window.location.reload();
        // this.toaster.successToastr("Login Succefull !")
      }else{
        const user = new User()
        user.setData(data.data)
        localStorage.setItem('userId',data?.data.user_id)
        user.setToken(data.data.token.toString())
        this.route.navigate(['/otp'])
      }
    } else {
        this.toaster.error(data.message.toString());
        console.log("Error", data.message)
      }
    })
  }
  getUrlReplace(url:any){
    let result = url.replace(/(^\w+:|^)\/\//, '');
    result = result.replace('.com', '');
    return result;
  }


  getGlobalSetting(){
    this.matchservice.getGlobalSettings().subscribe((res)=>{
      if(res?.status){
        console.log("res",res)
        this.gloabalData = res?.data

         this.url = environment.APIEndpoint + '/api/upload/image/' + this.gloabalData.logo ;
         this.favurl = environment.APIEndpoint + '/api/upload/image/' + this.gloabalData.favicon ;
      }
      else{
        this.toaster.error(res?.message)
      }
    })
  }


}
