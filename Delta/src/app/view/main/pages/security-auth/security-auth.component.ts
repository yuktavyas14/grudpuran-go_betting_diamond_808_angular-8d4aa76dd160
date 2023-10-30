import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Config } from 'src/app/core/model/config';
import { User } from 'src/app/core/model/user';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-security-auth',
  templateUrl: './security-auth.component.html',
  styleUrls: ['./security-auth.component.scss']
})
export class SecurityAuthComponent implements OnInit {
  userInfo = new User().getData();
  isTelegram= false;
  isMobile= false;
  isVerifyDisableOtp= false;
  isTelegramEnabled;
  masterPassword:any;
  opt1:any;
  opt2:any;
  opt3:any;
  opt4:any;
  opt5:any;
  opt6:any;
  getTelegramData:any;
  telegramBotUsername:any;
  otp: any;
  showOtpComponent = true;
  isOpenTelegrameInstructions = false;
  constructor(private service: MatchService, public toaster: ToastrService,) { 
    this.isTelegramEnabled= this.userInfo.is_telegram_enabled;
    console.log(this.isTelegramEnabled)
  }
  
  ngOnInit(): void {
  }
  onChangeMode(value:any){
    if(value == 1){
      this.isTelegram= false;
      this.isMobile= true;
    }
    else{ 
      this.isTelegram= true;
      this.isMobile= false;
    }

  }
  getConnectionId() {
    let payload = {
      password: this.masterPassword,
    }
    console.log(payload)
    console.log(this.masterPassword)
    this.service.getTelegramEnable(payload).subscribe((response:any) => {
      if (response.status) {
        this.isOpenTelegrameInstructions= true;
        this.getTelegramData=response.data
      }
      else{
        this.toaster.error(response.message)
      }
    } 
    )
  }
  
  onRequestDisable() {
    
    this.service.requestDisable().subscribe((response) => {
      if (response.status) {
        this.telegramBotUsername = response.data.telegram_bot_username;
        this.isVerifyDisableOtp= true;
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
      let payload ={
        otp: otp.toString()
      }
      this.service.verifyDisableOtp(payload).subscribe((response) => {
        if (response.status) {
        }
        else{
          this.showOtpComponent = false;
          this.otp = null;
          setTimeout(() => {
            this.showOtpComponent = true;
          }, 0);
          this.toaster.error(response.message)
        }
      }
      )}
  }
  setVal(val:any) {
    this.ngOtpInput.setValue(val);
  }

 
}
