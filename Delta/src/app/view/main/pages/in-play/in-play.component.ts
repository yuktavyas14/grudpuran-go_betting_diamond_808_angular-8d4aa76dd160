import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-in-play',
  templateUrl: './in-play.component.html',
  styleUrls: ['./in-play.component.scss'],
  providers: [DatePipe]

})
export class InPlayComponent implements OnInit {
  sportList : any;
  sportId   : any;
  gameList  : any;
  openWelcomePopup:any;
  origin:any;
  imageUrl= {
    "Cricket": '',
    "Soccer" : '',
    "Tennis" : ''
  }
  selectedID  : any = 4;
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
  constructor(private matchService : MatchService,public _router: Router,private _datePipe:DatePipe) {
    this.getCupsForMenu();
    this.dayAftertomorrow.setDate(this.dayAftertomorrow.getDate()+2);
    this.dayafterTommorowName =    this.days[this.dayAftertomorrow.getDay()];
    this.origin = document.location.origin;
   }
           
    

   
  

  ngOnInit(): void {
    localStorage.removeItem('isCup')
    this.getSportList()
    this.getMatchList()
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



  getMatchList(){
    let payload = {
      sport_id: '4',
      // in_play_page: 1
    }
    this.matchService.getMarketWatch(payload).subscribe((res:any)=>{
      if(res?.status){
        this.gameList = res?.data;
        // console.log("game",res?.data);

      }else{
      }
    })
  }

  getCupMatch(matchId: any,cupName:string){
    localStorage.setItem('isCup',cupName)
    this._router.navigate(['/main/matchdetails',matchId])

  }
  getSportMatch(sportsID: any){
    sessionStorage.setItem('sportId',sportsID)
    this.sportId = sportsID;
    if(sportsID ==7 || sportsID == 4339){
      this.onSelectDay(0)
      return;
    }
    this.selectedID = sportsID;
    let payload = {
      sport_id: sportsID,
      
    }
    this.matchService.getMarketWatch(payload).subscribe((res:any)=>{
      if(res?.status){
        this.gameList = res?.data;
        // console.log("game",res?.data);

      }else{
        // this.toaster.error(res?.message);
      }
    })
  }
  setSportId(Id:any){
    sessionStorage.setItem('sportId',Id)
  
  }
  trackByMethod(index:number, el:any): number {
    return el.id;
  }
  getFlag(flag:any){
    return `flag-icon flag-icon-${flag.toLowerCase()} flag-icon-squared`
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
  openMarket(data:any, slot:any){ 
    let routeLink= `/main/racingdetails/${data.match_id}/${slot.market_start_time}`
    this._router.navigate([routeLink])
    // this._router.navigate(['/main/racingdetails',data.match_id,slot.market_id])
    //this._router.navigate(['/main/racingdetails',data.match_id,slot.market_id,slot.start_date_time])

  }
}


