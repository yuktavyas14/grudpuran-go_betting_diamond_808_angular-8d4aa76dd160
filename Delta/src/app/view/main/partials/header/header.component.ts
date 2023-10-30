import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Globals } from 'src/app/core/model/global';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatchService } from 'src/app/core/services/match.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare const paymentPro:any;
declare var $: any;
declare global {
  interface Window {
    fastTag?: any;
  }
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails: any = JSON.parse(localStorage.getItem('userinfo') || 'null');
  userInfo = new User().getData();
  
  mySub?: Subscription;
  userDetail: any;
  sportList: any;
  siteMessage: any;
  flagBalance: Boolean = true;
  flagExposure: Boolean = true;
  sportListCup: any;
  originSite:any= window.location.origin;
  public searchText_len: any;
  public searchText: any;
  public searchResult: any;
  private reportData: any;
  eventsDataheader: any = [];
  flag = false;
  isminimizePayment=true
  ismaximizePayment=false
  isDispaly = false;
  isPayment:any=false;
  serchevents: any;
  logo:any=`${Globals.Url}/api/upload/image/logo.png`;
  payAmount: any;
  isDesposit = true;
  isWithdraw = false;
  isPaymentShow = '0'
  withDrawForm: FormGroup;
  exposureDetailList :any = []
  token = localStorage.getItem('token');
  paymentUrl:any;
  origin:any='https://diamond808.xyz';
  access_key= "7dhY6HoY6ybzZQreUzIvOePUWWoVOH";
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private matchService: MatchService,
    private router: Router, private location: Location, private sanitizer: DomSanitizer,private toaster:ToastrService) {
      this.logo=`${Globals.Url}/api/upload/image/logo.png`;
    this.withDrawForm = this.formBuilder.group({
      'account_number': ["", [Validators.required]],
      'ifsc': ["", [Validators.required]],
      'description': ["", Validators.required],
      'phone': ["", [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      'email': ["", [Validators.required]],
      'amount': ["", [Validators.required]],
      'name': ["", [Validators.required]],
    });
    this.globalConstant();
  }

  ngOnInit(): void {
    this.matchService.getSetting().subscribe(res => {
      if (res.status) {
        // this.logo = `${Globals.Url}/api/upload/image/` + res?.data?.logo;
        this.isPaymentShow = res?.data?.payment_gateway || '0'

      }
    })
    // this.logo = Globals.Url + '/uploads/logo.png';
    this.getTextSetting()
    this.mySub = interval(2000).subscribe((func => {
      this.getUserBalance()
    }))




    if (localStorage.getItem("flagBalance")) {
      this.flagBalance = JSON.parse(localStorage.getItem("flagBalance") || '')
    }
    if (localStorage.getItem("flagExposure")) {
      this.flagExposure = JSON.parse(localStorage.getItem("flagExposure") || '')
    }
  }
  onDepositeWithdraw(){
    debugger;
        paymentPro({
          "access_key": this.access_key,
          "auth_token": this.authService.tokenHeader,
          "origin": this.origin,
          authorization:1,

      style:{
          'color':'#9b8813'
      },
          // authorization:{
          //   key:1,
          //   // 0= logout
          //   // 1= login
          // }
    
            });}
  onDepositeWithdraw1(){
this.isPayment=true
    $('#onwithdrawmodal').modal('show')
    let url2:any=`https://fasttag.world/?access_key=${this.access_key}&auth_token=${this.token}&origin=${this.origin}`
    let url:any=`https://fasttag.world/?origin=${this.origin}`

    let url1:any=`http://localhost:4444/?access_key=${this.access_key}&auth_token=${this.token}&origin=${this.origin}`
    this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url2) ;
    console.log(this.paymentUrl,"Payment")

    // const iframe= document.createElement('IFRAME')
    // iframe.id= 'payment-ifr';
    // iframe.style.display="none";
    // (<HTMLIFrameElement>iframe).src= url1;
    // document.body.appendChild(iframe)
    const data = {
      "access_key":this.access_key,
     "auth_token":this.token,
     "origin":this.origin}
 
    this.postCrossDomainMessage('https://fasttag.world',data)
  }

  postCrossDomainMessage(link:any, data:any){
    let postUrl:any;
    let iframeId:any;
    postUrl = this.originSite;
    const iframe= document.getElementById('ifr')
    // console.log(iframe)
    if(iframe == null){return;}
    const iWindow:any= (iframe as HTMLIFrameElement).contentWindow;
    let storeData= data;
    console.log(storeData)
    setTimeout(() => {
      iWindow.postMessage(storeData,'https://fasttag.world')
    }, 1000);
  }
  // onDepositeWithdraw(){
  //   $('#onwithdrawmodal').modal('show')
  //   let url:any=`https://payment.diamond808.xyz/frontend/?access_key=${this.access_key}&auth_token=${this.token}&origin=${this.origin}`
  //   let url1:any=`http://localhost:4444/?access_key=${this.access_key}&auth_token=${this.token}&origin=${this.origin}`
  //   this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url) ;
  // }
sendPayload() {
  debugger
  let Data = {
    "access_key": "hdwokidjqswdepoqkkwkjdeqwpdojwPW",
    "auth_token": this.token,
    "origin": "testsiterr.com",
    "userid": 456,
    "username": "fasttagg"
}
  // if(window.fastTag) {
  //   window.fastTag.send('ipcChannel', Data);
  // }
  this.fastTag(Data);
}
onClosePyment(){
  this.isPayment=false
    this.ismaximizePayment=false;
    this.isminimizePayment=true;
}
  isshowSearchBox = false;
  serachInput() {
    this.isshowSearchBox = !this.isshowSearchBox
  }
  onChange(value: any) {
    console.log(value)
    if (value === 'Deposit') {
      this.isDesposit = true;
      this.isWithdraw = false;
    } else {
      this.isDesposit = false;
      this.isWithdraw = true;
    }

  }
  onminimizePayment(){
    debugger;
    $(".payment_custome_model").addClass("iframe_minimize");
    $(".payment_custome_model").removeClass("iframe_maximize");
    this.ismaximizePayment=true;
    this.isminimizePayment=false;
  }
  onmaximizePayment(){
    debugger
    $(".payment_custome_model").removeClass("iframe_minimize");
    $(".payment_custome_model").addClass("iframe_maximize");
    this.ismaximizePayment=false;
    this.isminimizePayment=true;
  }
  getUserBalance() {
    let payload = {
      id: Number(this.userDetails?.user_id)
    }
    if (payload?.id) {
      this.matchService.getUserBalance(payload).subscribe((res: any) => {
        if (res?.status) {
          this.userDetail = res?.data
        }
      })
    }
  }
  getUserBalanceDecimal(value:any){

    if(value ==0){
      return value
    }
    else{
      if(value){
        return value.toFixed(2);
        }
    }

  }
  gotoMatchDetail(item:any){
    if(item.match_id =='-1' || item.match_id =='-2' || item.match_id =='-3' || item.match_id =='-4' || item.match_id =='-5' || item.match_id =='-7' || item.match_id =='-145' || item.match_id =='-1010' || item.match_id =='-1011'
    || item.match_id =='-1012' || item.match_id =='-1013' || item.match_id =='-1014' || item.match_id =='-1015'|| item.match_id =='-1016' || item.match_id =='-1017' || item.match_id =='-1018' || item.match_id =='-1020' || item.match_id =='-1022'){
      this.router.navigate(['/main/matchdetail',item.match_id])

    }else{
      this.router.navigate(['/main/matchdetails',item.match_id])

    }
    // this.router.navigate(['/main/matchdetails',item.match_id])
  }
  hide(event: any) {
    this.flag = false;
    this.serchevents = ''
    // this.eventsDataheader = []
    // this.searchByMatchNameHeader('')
    // document.getElementById("allGamesList").style.display = 'none' ;
  }

  show(event: any) {
    this.flag = true;
    this.isDispaly = true;
    // document.getElementById("allGamesList").style.display = 'block'
  }
  fastTag(payload:any) {
    debugger
    console.log(payload);
    //Front Url
    var iframeSource = 'https://fasttagfront.loopncode.com/';

    //post code
    var Data = payload;

    // Create the iframe    
    var iframe = document.createElement('iframe');
    var dialog = document.createElement('dialog');
    iframe.setAttribute('src', iframeSource);
    dialog.setAttribute('id', 'myDialog');
    iframe.setAttribute('id', 'the_iframe');
    iframe.style.width = 100 + '%';
    iframe.style.height = 100 + '%';
    iframe.style.border = 0 + '';

    dialog.style.top=0+'';  
    dialog.style.width = 100 + '%'; 
    dialog.style.height = 100 + '%'; 
    dialog.style.zIndex = 9999 + '';
    dialog.style.padding = 0 + 'px'; 
    dialog.style.margin = 0 + 'px'; 
    dialog.style.border = 0 + '';  
    // const iframe = document.createElement('iframe');
    iframe.src = iframeSource;
    document.body.appendChild(iframe);
    
    iframe.addEventListener('load', () => {
      // iframe.contentWindow.postMessage(Data, iframeSource);
    });

    document.body.appendChild(dialog);
    dialog.appendChild(iframe);
  //  document.getElementById("myDialog").showModal();
}
  searchByMatchNameHeader(value: any) {
    if (value == '' || value.length == 0) {
      this.eventsDataheader = []

      this.flag = false;
      this.isDispaly = false;

    } else {
      this.isDispaly = true;

      this.eventsDataheader = []
      let payload = {
        search: value
      }
      this.matchService.searchByMatchNameHeader(payload).subscribe((res) => {
        if (res?.status) {
          console.log(res?.data)
          this.eventsDataheader = res?.data;
        }
      })
    }
  }
  navigateToMatchdetail() {
    // document.getElementById("allGamesList").style.display = 'none' ;
    this.isDispaly = false;
    this.serchevents = ''
  }
  // getUserBalance(){
  //   let payload = {
  //     id: Number(new User().getData().user_id)
  //   }
  //   this.matchService.getUserBalance(payload).subscribe((res)=>{
  //     if(res?.status){
  //       this.userDetails= res?.data
  //     }
  //   },()=>{
  //     if (this.location?.path().split('/')[2] != 'login') {
  //       setTimeout(() => res(this.getUserBalance()), 1000);
  //     }
  //   },
  //   ()=>{
  //     if (this.location?.path().split('/')[2] != 'login') {
  //       setTimeout(() => resolve(this.getUserBalance()), 1000);
  //     }
  //   })

  logout() {
    let payload = {
      user_id: new User().getData().user_id,
      tokan: new User().getToken()
    }
    this.authService.logout(payload).subscribe((res: any) => {
      if (res?.status) {
        paymentPro({
          "access_key": this.access_key,
          "auth_token": this.authService.tokenHeader,
          "origin": this.origin,
          authorization:0,

      style:{
          'color':'#9b8813'
      },
          // authorization:{
          //   key:1,
          //   // 0= logout
          //   // 1= login
          // }
    
            })
            window.location.reload()
        this.router.navigate(['/auth/login']);
        localStorage.clear();
      }
    })
  }


  getCupsForMenu() {

    this.matchService.getCupsForMenu().subscribe((res) => {
      if (res?.status) {
        this.sportListCup = res?.data;
        // console.log(this.sportListCup , "cup")
      }
    })
  }

  getTextSetting() {
    this.matchService.getKeyTextSetting().subscribe(res => {
      if (res?.status) {
        this.siteMessage = res?.data?.site_message;
      }
    })
  }

  navigateToChangePassword() {
    this.router.navigate(['/main/chage-password'])
  }

  ngOnDestroy() {
    this.mySub?.unsubscribe()
  }


  toggleBalance(data: any) {
    this.flagBalance = data
    localStorage.setItem("flagBalance", data)
  }

  toggleExposure(data: any) {
    this.flagExposure = data.target.checked;
    localStorage.setItem("flagExposure", data.target.checked)

  }
  globalConstant() {
    this.matchService.globalConstant().subscribe(response => {
      // this.logo = response.data.logo

    }, error => {
    });
  }
  paymenyUrl: any="";
  onPayment() {
    console.log(this.payAmount)
    let amount = { amount: +this.payAmount }
    this.matchService.payInGetPaymentUrl(amount).subscribe(response => {
      if (response.status) {
        let urlData = response.data.response.Url;
        //this.paymenyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlData) ;
        // console.log(this.paymenyUrl)
        $('#modalDepositWithdraw').modal('hide');
        window.open(urlData, "_blank");
        // $('#paymentGetway').modal('show');
      }
    }, error => {
    });
  }


  onWithdraw(){
    if(this.withDrawForm.invalid){
      this.withDrawForm.markAllAsTouched()
      return
    }
    this.withDrawForm.patchValue({
      amount : +this.withDrawForm.value.amount
    })

    this.matchService.sendWithdrawRequest(this.withDrawForm.value).subscribe((data:any) => {

      if (data.status) {
        $('#modalDepositWithdraw').modal('hide');
        this.withDrawForm.reset();
        this.toaster.success(data?.message)
      } else {
        this.toaster.error(data.message);

      }
    })
  }
  getExposureDetails(){
    let payload = {

    }
    this.exposureDetailList = []
    this.matchService.userDetailForUser(payload).subscribe((res:any)=>{
      if(res?.status){
      this.exposureDetailList = res?.data;

    }
  })
    $("#modalExposureDetail").modal('show');
    // this.route.navigate(['/main/exposure-details']);

  }
  trackByFn(index:any, item:any) {
    return index; // or item.id
  }
}
