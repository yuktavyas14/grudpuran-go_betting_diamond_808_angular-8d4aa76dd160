import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/core/services/socket.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { User } from 'src/app/core/model/user';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
import { unique } from 'jquery';

declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [SocketService,DatePipe]
})
export class HomeComponent implements OnInit,OnDestroy {
  isRRR= false;
  dreamCasinoProductList

  hostname : any
  sportId:any;
  userInfo = new User().getData();
  public dayafterTommorowName:any;
  public selectedIndex: number = 0;
  public selectedIndex1: any= 'today';
  dayAftertomorrow = new Date()

  gameList:any;
  casinoSportList:any;
  sportList:any;
  public   venuFilterbyCountryData = []
  public   venuFilterbyCountryData1 = [];
  matchVenulist;
  public  venuFilterbyCountryKey ;
  public countryListCode : any
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  filterDate;
  activeCountry=0;
  gameCountryList:any;
  gameCountryMatchList:any;
  matchDate:any;
  
  constructor(private socketSerive :SocketService ,private service:MatchService, 
    private toaster:ToastrService, public _router:Router,private _datePipe:DatePipe) {
      this.dayAftertomorrow.setDate(this.dayAftertomorrow.getDate()+2);
    this.dayafterTommorowName =    this.days[this.dayAftertomorrow.getDay()];
    this.hostname = window.location.hostname;
    if(this.isRRR){
      this.getProductList();
    }
   }

  ngOnInit(): void {
    this.getSportList();
    this.getMatchList('4');
    this.getCasinoSportList();
   

    this.socketSerive.getSports().subscribe(res => {
      // console.log("test",res)
      if(res == 'getSport'){
        this.getSportList()
      }

    },(error :any)=> {
      console.log("error")
    })
  }
  getProductList() {
    let payload = {
    }
    this.service.getProductList(payload).subscribe((res) => {
      if (res?.status) {
        this.dreamCasinoProductList = res?.data;
        console.log(this.dreamCasinoProductList, "dream");
        
  
      }
    })
  }
  getSportList(){
    let payload = {
      is_active :'1'
    }
    this.service.getSportList(payload).subscribe((res)=>{
      if(res?.status){
      this.sportList = res?.data;
      }
    })
  }
  navigateTocategory(product){
    this._router.navigateByUrl(`/main/games/gamesdream/${product}`)
  }
  
  
  dateFormate(date){
    
    let newDate= moment(date).format(date);
    return newDate;
  }
  dateFormate1(date){
    const months= ["JAN", "FEB", "MAR", "PAR", "MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
    let current_datetime = new Date(date)
    let formatted_date = current_datetime.getDate() + " " + (months[current_datetime.getMonth()]) + " " + current_datetime.getFullYear() + " " +this.getAmPm(current_datetime.getHours(),current_datetime.getMinutes());
    return formatted_date;
    
  }
  getAmPm(hours, mins){
    let hour= (hours+24-2)%24;
    if(mins<10){
      mins= '0'+mins
    }
    var mid= 'am';
    if(hours ==0)
    {
      hours=12;
    }
    else if(hours>12){
      hours= hours%12;
      mid= 'pm'
    }
    return hours + ':'+mins + ' '+ mid
  }
  ngAfterViewInit():void {
    if(JSON.parse(localStorage.getItem('logedIn'))== 'true'){
      $("#myModal").modal('show');
      }
    // obj.is_change_password= "0"
    // localStorage.setItem('userinfo', JSON.stringify(obj));
  }
  closeBtn(){
    localStorage.setItem('logedIn',JSON.stringify('false'))
    $("#myModal").modal('hide');

  }

  getMatchList(id){
    console.log(id);
    this.sportId= id;
    if(id ==7 || id == 4339){
      this.onSelectDay(0)
      return;
    }
    
    let payload = {
      sport_id: id,
      in_play_page: 0,
      is_cup: "0"
    }
    this.service.getMarketWatch(payload).subscribe((res)=>{
      if(res?.status){
        this.gameList = res?.data;
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
  getCasinoSportList(){
    this.service.getCasinoSportList().subscribe((res)=>{
      if(res?.status){
        this.casinoSportList = res?.data;
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
  gotoMatch(id){
    sessionStorage.setItem('sportId',id)
    this._router.navigate(['/main/matchdetails',id])
  }
  gotoCasinoMatch(id){
    this._router.navigate(['/main/matchdetail',id])
  }
  gotoCasinoByMatchId(id){
    if(id =='-1' || id =='-2' || id =='-3' || id =='-4' || id =='-5' || id =='-7' || id =='-145' || id =='-1010' || id =='-1011' 
    || id =='-1012' || id =='-1013' || id =='-1014' || id =='-1015'|| id =='-1016'  || id =='-1019' || id =='-1020'|| id =='-1021'){
      this._router.navigate(['/main/matchdetails',id])

    }else{
      this._router.navigate(['/main/matchdetail',id])

    }
  }
  setSport(id){
    sessionStorage.setItem('sportId',id)
  }

  ngOnDestroy() {
    this.socketSerive.socketDisconnect();
  }
  onSelectDay(value){
    var date = new Date();
    date.setDate(date.getDate()+0);
    if(value===1){
    date.setDate(date.getDate()+1);
    }
    if(value===2){
    date.setDate(date.getDate()+2);
    }
    this.getMatchCountryListBySportId(date)

  }
  addActiveClass(className){
    this.selectedIndex1 = className;
      if(className == 'today'){
        this.filterDate = new Date();
       
        let date = new Date().getDate();
        this.venuFilterbyCountryData = this.venuFilterbyCountryData1.filter( (element, index) => {
            if(new Date(element.market_start_time).getDate() == date){
                return element
            }
        })
  
      } 
      else if (className == 'tomorrow'){
        let dt= new Date();
        this.filterDate = dt.setDate(dt.getDate() + 1);
        if(className == 'tomorrow'){
          
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate()+1);
            this.venuFilterbyCountryData = this.venuFilterbyCountryData1.filter( (element, index) => {
                if(new Date(element.market_start_time).getDate() == tomorrow.getDate()){
                    return element
                }
            })
  
          }
      } else {
        let dt= new Date();
        this.filterDate = dt.setDate(dt.getDate() + 2);
          this.venuFilterbyCountryData = this.venuFilterbyCountryData1.filter( (element, index) => {
            if(new Date(element.market_start_time).getDate() == this.dayAftertomorrow.getDate()){
                return element
            }
        })
      }
  }
  getMatchCountryListBySportId(date){
    let datetime = this._datePipe.transform(date, 'yyyy-MM-dd');
    this.matchDate= datetime;
    let payload = {
      sport_id: this.sportId,
      date:datetime

    }
    this.service.getMatchCountryListBySportId(payload).subscribe((res)=>{
      if(res?.status){
        this.gameCountryList = res?.data;
        if(this.gameCountryList !=null && this.gameCountryList.length>0 ){
          this.getMatchVenueListByCountryCodeSportId(0,this.gameCountryList[0])

        }
        else{
          this.gameCountryMatchList=[];
        }
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
  getMatchVenueListByCountryCodeSportId(index,vanue:any){
    this.activeCountry= index;
    let payload = {
      sport_id: this.sportId,
      country :vanue.country,
      date:this.matchDate
    }
    this.service.getMatchVenueListByCountryCodeSportId(payload).subscribe((res)=>{
      if(res?.status){
        this.gameCountryMatchList = res?.data;
        console.log(this.gameCountryMatchList)
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
  public mapDataList;

  groupBy(list){
    let dataValue= list.reduce((r,a)=>{
      r[a.market_start_time]= r[a.market_start_time] || [];
      r[a.market_start_time].push(a);
      return r;
    },Object.create(null))
    this.mapDataList= dataValue

//     var unique = [];
//   var distinct = [];
// for( let i = 0; i < list.length; i++ ){
//   if( !unique[list[i].market_start_time]){
//     distinct.push(list[i].market_start_time);
//     unique[list[i].market_start_time] = 1;
//   }
// }
// console.log(unique,'unique')
// console.log(distinct,'distinct')
    console.log(dataValue)
    return dataValue
  }
  
  openMarket(data, slot){ 
  
    let routeLink= `/main/racingdetails/${data.match_id}/${slot.market_start_time}`
    this._router.navigate([routeLink])
  }
}
