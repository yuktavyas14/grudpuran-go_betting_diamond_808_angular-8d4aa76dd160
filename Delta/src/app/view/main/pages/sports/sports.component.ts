import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, KeyValue } from '@angular/common';

import { MatchService } from 'src/app/core/services/match.service';
declare var $: any;
@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss'],
  providers: [DatePipe]

})
export class SportsComponent implements OnInit {
  sportList : any;
  sportId   : any;
  gameList  : any;
  openWelcomePopup:any;
  imageUrl= {
    "Cricket": '',
    "Soccer" : '',
    "Tennis" : ''
  }
  origin:any;
  selectedID : any = 4;
  seriesList:any;
  cupList:any;
  public dayafterTommorowName:any;
  public selectedIndex: number = 0;
  public selectedIndex1: any= 'today';
  dayAftertomorrow = new Date()
  public   venuFilterbyCountryData = []
  public   venuFilterbyCountryData1 = [];
  matchVenulist:any;
  public  venuFilterbyCountryKey :any;
  public countryListCode : any
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  filterDate:any;
  activeCountry=0;
  gameCountryList:any;
  gameCountryMatchList:any;
  matchDate:any;

  constructor(private matchService : MatchService, public _router: Router,private _datePipe:DatePipe) {
    this.dayAftertomorrow.setDate(this.dayAftertomorrow.getDate()+2);
    this.dayafterTommorowName =    this.days[this.dayAftertomorrow.getDay()];
    this.origin = document.location.hostname;

    this.getCupsForMenu();

    this.getSeriesList();

   }

  ngOnInit(): void {
    localStorage.removeItem('isCup')
      this.openWelcomePopup =  localStorage.getItem('openWelcomePopup');
        if(this.openWelcomePopup != undefined){
                        $("#myModal").modal('show');


        }
    this.getSportList()
    this.getMatchList()
  }
  getSeriesList() {

    let payload = {
      // sport_id: -1,
      is_sidebar_call : 0
    }
    this.matchService.getSeriesList(payload).subscribe((res) => {
      if (res.status) {
        this.seriesList = res.data;
      } else {
       // this.toaster.error(res?.message)
      }
    })

  }
getUrlReplace(url:any){
  let result = url.replace(/(^\w+:|^)\/\//, '');
  return result;
}

  /**
   * this method get sport list
   * param is 1
   */
  getSportList(){
    let payload = {
      is_active :'1'
    }
    this.matchService.getSportList(payload).subscribe((res)=>{
      if(res?.status){
      this.sportList = res?.data;
      }
    })
  }

setSportId(Id:any){
  sessionStorage.setItem('sportId',Id)

}
getFlag(flag:any){
  return `flag-icon flag-icon-${flag.toLowerCase()} flag-icon-squared`
}
  getMatchList(){
    let payload = {
      sport_id: '4',
      in_play_page: 1
    }
    this.matchService.getMarketWatch(payload).subscribe((res:any)=>{
      if(res?.status){
        this.gameList = res?.data;
        console.log("game",res?.data);

      }else{
      }
    })
  }

  getSportMatch(sportsID: any){
    this.sportId = sportsID;
    if(sportsID ==7 || sportsID == 4339){
      this.onSelectDay(0)
      return;
    }
    let payload = {
      sport_id: sportsID,
      in_play_page: 1
    }
    this.matchService.getMarketWatch(payload).subscribe((res:any)=>{
      if(res?.status){
        this.gameList = res?.data;
        console.log("game",res?.data);

      }else{
        // this.toaster.error(res?.message);
      }
    })
  }

  trackByMethod(index:number, el:any): number {
    return el.id;
  }
    closeModal(){
      localStorage.removeItem('openWelcomePopup')
            $("#myModal").modal('hide');

  }
  getSeriesMatch(series: any)
  {
    this._router.navigate(['/main/casino',series?.series_id,series?.name])
  }
  getCupsForMenu() {

    let payload = {
      // sport_id: -1,
      is_sidebar_call : 0
    }
    this.matchService.getCupsForMenu().subscribe((res) => {
      if (res.status) {
        this.cupList = res.data;
      } else {
       // this.toaster.error(res?.message)
      }
    })

  }
  getCupMatch(matchId: any,cupName:string){
    localStorage.setItem('isCup',cupName)
    this._router.navigate(['/main/matchdetails',matchId])

  }
  onSelectDay(value:any){
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
  addActiveClass(className:any){
    this.selectedIndex1 = className;
  }
  getMatchCountryListBySportId(date:any){
    let datetime = this._datePipe.transform(date, 'yyyy-MM-dd');
    this.matchDate= datetime;
    let payload = {
      sport_id: this.sportId,
      date:datetime

    }
    this.matchService.getMatchCountryListBySportId(payload).subscribe((res)=>{
      if(res?.status){
        this.gameCountryList = res?.data;
        if(this.gameCountryList !=null && this.gameCountryList.length>0 ){
          this.getMatchVenueListByCountryCodeSportId(0,this.gameCountryList[0])

        }
        else{
          this.gameCountryMatchList=[];
        }
      }else{
        //this.toaster.error(res?.message);
      }
    })
  }
  getMatchVenueListByCountryCodeSportId(index:any,vanue:any){
    this.activeCountry= index;
    let payload = {
      sport_id: this.sportId,
      country :vanue.country,
      date:this.matchDate
    }
    this.matchService.getMatchVenueListByCountryCodeSportId(payload).subscribe((res)=>{
      if(res?.status){
        this.gameCountryMatchList = res?.data;
        console.log(this.gameCountryMatchList)
      }else{
        //this.toaster.error(res?.message);
      }
    })
  }
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
  public mapDataList:any;
  groupBy(list:any[]){
   return list.reduce((r:any,a:any)=>{
      r[a.market_start_time]= r[a.market_start_time] || [];
      r[a.market_start_time].push(a);
      return r;
    },Object.create(null))
    // this.mapDataList= dataValue
    // return dataValue
  }
  openMarket(data:any, slot:any){
    let routeLink= `/main/racingdetails/${data.match_id}/${slot.market_start_time}`
    this._router.navigate([routeLink])
   // this._router.navigate(['/main/racingdetails',data.match_id,slot.market_id,slot.start_date_time])

    // this._router.navigate(['/main/racingdetails',data.match_id,slot.market_id])
  }
}
