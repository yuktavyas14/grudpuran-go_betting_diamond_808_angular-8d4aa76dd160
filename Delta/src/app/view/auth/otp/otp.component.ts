import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/model/user';
import { ToastrService } from 'ngx-toastr';
import { Component,  OnDestroy, OnInit, Renderer2,ViewChild} from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Globals } from 'src/app/core/model/global';
import { Config } from 'src/app/core/model/config';
import { MatchService } from 'src/app/core/services/match.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {


  constructor(private renderer: Renderer2,private fb:FormBuilder,
    private service:AuthService,private route:Router ,private matchService : MatchService,
    private toaster:ToastrService,private userservice:UserService) { }
  logo:any;
  isSignUp:any='0'
  userId:any;
  otp: any;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config :Config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '40px'
    }
  };
  onOtpChange(otp:any) {
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
  setVal(val:any) {
    this.ngOtpInput.setValue(val);
  }

 
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    this.matchService.getSetting().subscribe(res => {
      if(res.status){
        this.logo = `${Globals.Url}/api/upload/image/` + res?.data?.logo;
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
