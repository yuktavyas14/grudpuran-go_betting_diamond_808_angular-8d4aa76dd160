import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/model/user';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
import { resolve } from 'q';
import { Location } from '@angular/common'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/core/services/socket.service';
import { Globals } from 'src/app/core/model/global';

declare let $

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [SocketService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  hostname : any;
  constructor(public router : Router,  private socketSerive : SocketService, private toaster: ToastrService, private auth:AuthService ,
    private fb:FormBuilder,private userservice:UserService,private route:Router, private service:MatchService,private location:Location) {
      this.hostname = window.location.hostname;

     }
  userDetails:any;
  updateForm: FormGroup;
  isPayment=false;
  userInfo = new User().getData();
  serchevents: any;
  sportList:any;
  eventsDataheader : any =[];
  sportListCup     : any= [];
  flag    = false;
  seriesList:any;
  logo;
  exposureDetailList :any = []
     welcoomeMessage : any
     isDesposit= true;
     isWithdraw= false;
     isPaymentShow='0'
     isApk='0'
     withDrawForm: FormGroup;

  ngOnInit(): void {
    this.withDrawForm = this.fb.group({
      'account_number': ["", [Validators.required]],
      'ifsc': ["", [Validators.required]],
      'description': ["", Validators.required],
      'phone': ["", [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      'email': ["", [Validators.required]],
      'amount': ["", [Validators.required]],
      'name': ["", [Validators.required]],
    });
    this.userservice.getSetting().subscribe(res => {
      if(res.status){
        this.logo = `${Globals.Url}/api/upload/image/` + res?.data?.logo;

        this.welcoomeMessage = res?.data?.site_message;
        this.isPaymentShow = res?.data?.payment_gateway || '0';
        this.isApk= res?.data?.is_show_apk || '0';
      }
    })
    this.getCasinoSports();
    this.updateForm = this.fb.group({
     new_password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)  ]),
       // new_password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)  ]),
      confirm_password: new FormControl('', Validators.required),
      master_password: new FormControl('', Validators.required)
    })

    if (this.userInfo?.is_change_password === "1") {

      $('#change-pass').modal('show')
    }
    this.getUserBalance()
    this.getSportList()
    this.getSeriesList()
    this.getCupsForMenu()


    this.socketSerive.getSports().subscribe(res => {
      if(res == 'getSport'){
        this.getSportList()
      }

    },(error :any)=> {
      console.log("error")
    })


    this.socketSerive.getMenucup().subscribe(res => {
      if(res == 'getCupsForMenu'){
        this.getCupsForMenu()
      }

    },(error :any)=> {
      console.log("error")
    })


  }

  ngAfterViewInit(){
    window.onscroll = function() {myFunction()};

var header = document.getElementById("sidebar-right");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
  }

  getSportList(){
    let payload = {
      is_active :'1'
    }
    this.service.getSportList(payload).subscribe((res)=>{
      if(res?.status && res?.data ){
      this.sportList = res?.data.slice(0,7);
      }
    })
  }
  getUserBalance(){
    let payload = {
      id: Number(new User().getData().user_id)
    }
    this.service.getUserBalance(payload).subscribe((res)=>{
      if(res?.status){
        this.userDetails= res?.data
      }
    },()=>{
      if (this.location?.path().split('/')[2] != 'login') {
        setTimeout(() => resolve(this.getUserBalance()), 1000);
      }
    },
    ()=>{
      if (this.location?.path().split('/')[2] != 'login') {
        setTimeout(() => resolve(this.getUserBalance()), 1000);
      }
    })
  }
  getSeriesList() {

    let payload = {
      // sport_id: -1,
      is_sidebar_call : 0
    }
    this.service.getSeriesList(payload).subscribe((res) => {
      if (res.status) {
        this.seriesList = res.data;
      } else {
        this.toaster.error(res?.message)
      }
    })

  }
  onDashboard(){
    this.route.navigate(['/main/dashboard']);
  }
  getExposureDetails(){
    let payload = {
      
    }
    this.exposureDetailList = []
    this.service.userDetailForUser(payload).subscribe((res)=>{
      if(res?.status){
      this.exposureDetailList = res?.data;
      
    }
  })
    $("#modalExposureDetail").modal('show');
    // this.route.navigate(['/main/exposure-details']);

  }
  /**
   * This method is used for update password
   * @param new_password  confir_password and master_passowrd
   */
  updatePassword() {
    this.userservice.updatePassword(this.updateForm.value).subscribe((res) => {
      if (res?.status) {

        let obj = this.userInfo;
        obj.is_change_password= "0"
        localStorage.setItem('userinfoUser', JSON.stringify(obj));

        this.toaster.success(res?.message);
        $('#change-pass').modal('hide')
       
        if(JSON.parse(localStorage.getItem('logedIn'))== 'true' && this.userInfo?.is_change_password === "0"){
          $("#myModal").modal('show');
          }
          if (this.userInfo?.is_change_password === "1") {
            this.logout()
          }
      } else {
        this.toaster.error(res?.message);

      }
    })
  }
 
  /**
   * This method is used for loguout user
   * @param user_id as user ID
   * @param token
   */
  logout() {
  
    let payload = {
      user_id: new User().getData().user_id,
      tokan: new User().getToken()
    }
    this.auth.logout(payload).subscribe((res) => {
      if (res?.status) {
       
        // localStorage.clear();
          localStorage.removeItem('userinfoUser');
          localStorage.removeItem('tokenUser');
          localStorage.removeItem('logedIn');
//window.location.reload()
          this.route.navigate(['/auth/login']);
      }
    })
  }
  onChange(value){
    console.log(value)
    if(value ==='Deposit'){
      this.isDesposit= true;
      this.isWithdraw= false;
    }else{
      this.isDesposit= false;
      this.isWithdraw= true;
    }
   
  }


  searchByMatchNameHeader(value){
    if(value == ''){
      this.flag = false;
    }
    this.eventsDataheader = []
    let payload = {
      search : value
    }
    this.service.searchByMatchNameHeader(payload).subscribe((res) => {
      if (res?.status) {
        console.log(res?.data)
      this.eventsDataheader= res?.data;
      }
    })
  }


hide(event){
this.flag = false;
this.serchevents= ''
// this.eventsDataheader = []
// this.searchByMatchNameHeader('')
// document.getElementById("allGamesList").style.display = 'none' ;
  }

  show(event){
    this.flag = true;
    document.getElementById("allGamesList").style.display = 'block'
  }

  getCupsForMenu(){
    this.service.getCupsForMenu().subscribe((res)=>{
      if(res?.status){
      this.sportListCup = res?.data;
      // console.log(this.sportListCup , "cup")
      }
    })
  }


  navigateToMatchdetail(){
    document.getElementById("allGamesList").style.display = 'none' ;
    this.serchevents = ''
  }

  closeBtn(){
    localStorage.setItem('logedIn',JSON.stringify('false'))
    $("#myModal").modal('hide');

  }
  ngOnDestroy() {
    this.socketSerive.socketDisconnect();
  }
  casinoSports

dreamCasinoFlag = false
isMatkaFlag = false
isLiveCasinoFlag = false
letCasinoGameList:any;
getCasinoSports(){
  this.service.getCasinoSport().subscribe((res)=>{
    if(res?.status){
    this.casinoSports = res?.data
     this.letCasinoGameList= this.casinoSports.filter(item =>item.sport_id=='matka' || item.sport_id=='dreamcasino');
    console.log('letCasinoGameList',this.letCasinoGameList)
    this.dreamCasinoFlag = this.casinoSports.some((ele) => {
      if(ele.sport_id.toLowerCase() == 'dreamcasino'){
        return ele.is_active ==1 ? true : false
      } 
    });

    if(this.dreamCasinoFlag){
      this.router.navigate(['/main/dashboard'])
    }

    // istOfObjecs.some(item => JSON.stringify(item) === JSON.stringify(search1));
    }
  })
}
trackByFn(index, item) {
  return index; // or item.id
}
paymenyUrl:any;
payAmount:any;

  onPayment(){
    console.log(this.payAmount)
    let amount = {amount:+this.payAmount}
    this.service.payInGetPaymentUrl(amount).subscribe(response => {
    if(response.status){
     let urlData= response.data.response.Url;
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
    
    this.service.sendWithdrawRequest(this.withDrawForm.value).subscribe((data:any) => {
    
      if (data.status) {
        $('#modalDepositWithdraw').modal('hide');
        this.withDrawForm.reset();
        this.toaster.success(data?.message)
      } else {
        this.toaster.error(data.message);
      
      }
    })
  }
}


