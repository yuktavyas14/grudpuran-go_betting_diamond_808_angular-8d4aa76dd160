import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.css']
})
export class GlobalSettingsComponent implements OnInit {
  favurl
  url
  gloabalData
  fileToUpload: File = null;
  fileToUpload1 : File = null;
  cacheBust = Date.now(); 
  constructor(private service :MatchService, private toaster: ToastrService,private fb:FormBuilder) { }
  globalSetting :FormGroup;
  ngOnInit(): void {
    this.globalSetting = this.fb.group({
      site_message : new FormControl('',Validators.required),
      match_stack : new FormControl('',Validators.required),
      fancy_stack : new FormControl('',Validators.required),
      cricket_odds_commission : new FormControl(0,Validators.required),
      cricket_fancy_commission : new FormControl(0,Validators.required),
      cricket_bookmaker_commission : new FormControl(0,Validators.required),
      soccer_odds_commission : new FormControl(0,Validators.required),
      soccer_fancy_commission: new FormControl(0,Validators.required),
      soccer_bookmaker_commission : new FormControl(0,Validators.required),
      tennis_odds_commission : new FormControl(0,Validators.required),
      tennis_fancy_commission: new FormControl(0,Validators.required),
      tennis_bookmaker_commission : new FormControl(0,Validators.required),
      soccer_min_bet: new FormControl(0,Validators.required),
      tennis_min_bet: new FormControl(0,Validators.required),
      cricket_max_bet : new FormControl(0,Validators.required),
      cricket_min_bet : new FormControl(0,Validators.required),
      soccer_max_bet : new FormControl(0,Validators.required),
      tennis_max_bet : new FormControl(0,Validators.required),
      cricket_odds_delay : new FormControl(0,Validators.required),
      soccer_odds_delay: new FormControl(0,Validators.required),
      tennis_odds_delay : new FormControl(0,Validators.required),
      cricket_fancy_delay: new FormControl(0,Validators.required),
      soccer_fancy_delay : new FormControl(0,Validators.required),
      tennis_fancy_delay : new FormControl(0,Validators.required),
      transaction_password : new FormControl(0,Validators.required),
      sign_up : new FormControl('0',Validators.required),
      payment_gateway : new FormControl('0',Validators.required),
      session_min_bet : new FormControl(0,Validators.required),
      session_max_bet : new FormControl(0,Validators.required),
      bookmaker_max_stack : new FormControl(0,Validators.required),
      show_user_setting  : new FormControl(0,Validators.required)

    })
    this.getGlobalSetting()
  }
  getGlobalSetting(){
    this.service.getGlobalSettings().subscribe((res)=>{
      if(res?.status){
        console.log("res",res)
         this.setValues(res?.data)
        this.gloabalData = res?.data

         this.url = environment.APIEndpoint + '/api/upload/image/' + this.gloabalData.logo ;
         this.favurl = environment.APIEndpoint + '/api/upload/image/' + this.gloabalData.favicon ;
      }
      else{
        this.toaster.error(res?.message)
      }
    })
  }
  setValues(data){
    this.globalSetting.setValue({
      site_message : data?.site_message,
      match_stack : data?.match_stack,
      fancy_stack : data?.fancy_stack,
      cricket_odds_commission :  parseInt(data?.cricket_odds_commission),
      cricket_fancy_commission :  parseInt(data?.cricket_fancy_commission),
      cricket_bookmaker_commission :  parseInt(data?.cricket_bookmaker_commission),
      soccer_odds_commission :  parseInt(data?.soccer_odds_commission),
      soccer_fancy_commission:  parseInt(data?.soccer_fancy_commission),
      soccer_bookmaker_commission :  parseInt(data?.soccer_bookmaker_commission),
      tennis_odds_commission :  parseInt(data?.tennis_odds_commission),
      tennis_fancy_commission:  parseInt(data?.tennis_fancy_commission),
      tennis_bookmaker_commission :  parseInt(data?.tennis_bookmaker_commission),
      soccer_min_bet: parseInt(data?.soccer_min_bet),
      tennis_min_bet:  parseInt(data?.tennis_min_bet),
      cricket_max_bet : parseInt(data?.cricket_max_bet),
      cricket_min_bet :  parseInt(data?.cricket_min_bet),
      soccer_max_bet :  parseInt(data?.soccer_max_bet),
      tennis_max_bet : parseInt(data?.tennis_max_bet),
      cricket_odds_delay :  parseInt(data?.cricket_odds_delay),
      soccer_odds_delay:  parseInt(data?.soccer_odds_delay),
      tennis_odds_delay :  parseInt(data?.tennis_odds_delay),
      cricket_fancy_delay:  parseInt(data?.cricket_fancy_delay),
      soccer_fancy_delay :  parseInt(data?.soccer_fancy_delay),
      tennis_fancy_delay :  parseInt(data?.tennis_fancy_delay),
      session_min_bet :  parseInt(data?.session_min_bet),
      session_max_bet :  parseInt(data?.session_max_bet),
      bookmaker_max_stack :  parseInt(data?.bookmaker_max_stack),
      transaction_password :'',
      sign_up : data?.sign_up,
      payment_gateway : data?.payment_gateway,
      show_user_setting : data?.show_user_setting
    })

  }

  setGlobalSetting(){
    let requestData={
      site_message : this.globalSetting.value.site_message,
      match_stack : this.globalSetting.value.match_stack,
      fancy_stack : this.globalSetting.value.fancy_stack,
      cricket_odds_commission :  parseInt(this.globalSetting.value.cricket_odds_commission),
      cricket_fancy_commission :  parseInt(this.globalSetting.value.cricket_fancy_commission),
      cricket_bookmaker_commission :  parseInt(this.globalSetting.value.cricket_bookmaker_commission),
      soccer_odds_commission :  parseInt(this.globalSetting.value.soccer_odds_commission),
      soccer_fancy_commission:  parseInt(this.globalSetting.value.soccer_fancy_commission),
      soccer_bookmaker_commission :  parseInt(this.globalSetting.value.soccer_bookmaker_commission),
      tennis_odds_commission :  parseInt(this.globalSetting.value.tennis_odds_commission),
      tennis_fancy_commission:  parseInt(this.globalSetting.value.tennis_fancy_commission),
      tennis_bookmaker_commission :  parseInt(this.globalSetting.value.tennis_bookmaker_commission),
      soccer_min_bet: parseInt(this.globalSetting.value.soccer_min_bet),
      tennis_min_bet:  parseInt(this.globalSetting.value.tennis_min_bet),
      cricket_max_bet : parseInt(this.globalSetting.value.cricket_max_bet),
      cricket_min_bet :  parseInt(this.globalSetting.value.cricket_min_bet),
      soccer_max_bet :  parseInt(this.globalSetting.value.soccer_max_bet),
      tennis_max_bet : parseInt(this.globalSetting.value.tennis_max_bet),
      cricket_odds_delay :  parseInt(this.globalSetting.value.cricket_odds_delay),
      soccer_odds_delay:  parseInt(this.globalSetting.value.soccer_odds_delay),
      tennis_odds_delay :  parseInt(this.globalSetting.value.tennis_odds_delay),
      cricket_fancy_delay:  parseInt(this.globalSetting.value.cricket_fancy_delay),
      soccer_fancy_delay :  parseInt(this.globalSetting.value.soccer_fancy_delay),
      tennis_fancy_delay :  parseInt(this.globalSetting.value.tennis_fancy_delay),
      session_min_bet :  parseInt(this.globalSetting.value.session_min_bet),
      session_max_bet :  parseInt(this.globalSetting.value.session_max_bet),
      bookmaker_max_stack :  parseInt(this.globalSetting.value.bookmaker_max_stack),
      transaction_password :this.globalSetting.value.transaction_password,
      sign_up : this.globalSetting.value.sign_up,
      payment_gateway : this.globalSetting.value.payment_gateway,
      show_user_setting : this.globalSetting.value.show_user_setting
    }
    console.log(requestData,'requestData')
    this.service.setGlobalSettings(requestData).subscribe((res)=>{
      if(res?.status){
        this.toaster.success(res?.message)
      }else{
        this.toaster.error(res?.message)
      }
    })
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadSiteLogo() {
    console.log(this.fileToUpload ,"test")

    const formData: FormData = new FormData();
    formData.append('fileupload',  this.fileToUpload);
    this.service.uploadlogo(formData).subscribe(data => {
      alert(data.message);

    }, error => {
      console.log(error);
    });
  }

  handleFileInput1(files: FileList) {
    this.fileToUpload1 = files.item(0);
  }

  uploadSiteFavIcon(){
    const favIconFormData: FormData = new FormData();
    favIconFormData.append('fileupload',  this.fileToUpload1);
    this.service.uploadFavIcon(favIconFormData).subscribe(data => {
      alert(data.message);
      this.toaster.show(data.message)
    }, error => {
      console.log(error);
    });
  }

}
