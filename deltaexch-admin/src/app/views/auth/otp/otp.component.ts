import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/model/user';
import { ToastrService } from 'ngx-toastr';
import { Component,  OnDestroy, OnInit, Renderer2,ViewChild} from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Config } from 'src/app/core/model/config';
import { MatchService } from 'src/app/core/services/match.service';
import { environment } from 'src/environments/environment.prod';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {


  constructor(private renderer: Renderer2,private fb:FormBuilder,
    private service:AuthService,private route:Router ,
    private toaster:ToastrService,private matchservice : MatchService,
    private userservice:UserService) { }
  loginForm: FormGroup
  logo;
  isSignUp:any='0'
  userId:any;
  otp: string;
  url:any;
  favurl:any;
  gloabalData:any;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config :Config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  onOtpChange(otp1) {
    let otp=otp1.value;
    console.log(otp)
    if(otp.length > 5) {
    this.otp = otp;
    console.log(this.otp.length)
    if( this.otp.length == 6) {
      let data ={
        'user_id': +this.userId,
        'otp': this.otp.toString(),
      }
  
  
      this.service.verifyLoginOtp(data).subscribe((data:any) => {
        if (data.status) {
          this.route.navigate(['/main'])
          
        } else {
          
          this.showOtpComponent = false;
          this.otp = null;
          setTimeout(() => {
            this.showOtpComponent = true;
          }, 0);
          this.toaster.error(data.message.toString());
          // console.log("Error", data.message)
        }
      
      })
    }
  }
  }
  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

 
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    this.getGlobalSetting()
  
   

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
  resendLoginOtp() {
    
    let payload = {
      user_id: +this.userId
    }
    console.log(payload)
    this.service.resendLoginOtp(payload).subscribe((response) => {
      if (response.status) {
      }
      else{
        this.toaster.error(response.message)
      }
    },
      (err) => {
        
      },
      () => {
       
      }
    )
  }


  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
    // or whatever color you want to change when user move out of login page
  }


}
