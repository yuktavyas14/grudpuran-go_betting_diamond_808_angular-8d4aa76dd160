import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-in-play',
  templateUrl: './in-play.component.html',
  styleUrls: ['./in-play.component.scss'],
  providers: [DatePipe]
})
export class InPlayComponent implements OnInit {
  public dayafterTommorowName:any;
  public selectedIndex: number = 0;
  public selectedIndex1: any= 'today';
  dayAftertomorrow = new Date()
  sportId;
  sportName;
  gameList:any;
  public   venuFilterbyCountryData = []
  public   venuFilterbyCountryData1 = [];
  matchVenulist;
  public  venuFilterbyCountryKey ;
  public countryListCode : any
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  filterDate;
  activeCountry=0;
  constructor(private ac:ActivatedRoute,private service:MatchService,private toaster:ToastrService,
     private _router:Router,private _datePipe:DatePipe) {
      this.filterDate = new Date();
    this.dayAftertomorrow.setDate(this.dayAftertomorrow.getDate()+2);
    this.dayafterTommorowName =    this.days[this.dayAftertomorrow.getDay()];
   }
 

  ngOnInit(): void {
    this.ac.paramMap.subscribe((param) => {
      this.sportId = param.get('sportId');
      this.sportName = param.get('name');

      this.getMatchList()
      this.onSelectDay(0)
    })
    
    
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
  gameCountryList:any;
  gameCountryMatchList:any;
  matchDate:any;
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
  openMarket(data, slot){ 
    let routeLink= `/main/racingdetails/${data.match_id}/${slot.market_start_time}`
    this._router.navigate([routeLink])
 

  }
  getMatchList(){
    let payload = {
      sport_id: this.sportId,
      in_play_page: 0,
      is_cup   : '0'
    }
    this.service.getMarketWatch(payload).subscribe((res)=>{
      if(res?.status){
        this.gameList = res?.data;
        console.log(this.gameList)
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
 
gotoMatchDetails(game){
  console.log('====================================');
  console.log(game);
  // if(game.sport_id =='-1'){
    sessionStorage.setItem('sportId',game.sport_id)

    this._router.navigate(['/main/matchdetails',game.match_id])

  // }
  
  // if(game.sport_id =='7'){
    
  //   this._router.navigate(['/main/matchdetails',game.match_id])

  // }
  // else{
  //   this._router.navigate(['/main/matchdetails',game.match_id, game?.market_id])

  // }

  // [routerLink]="['/main/matchdetails',game.match_id, game?.market_id] "
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
navigateToMatchDetail(Time){
  localStorage.setItem('selectedMatch', JSON.stringify(Time));

//this.router.navigate(['main/exchange-details'], { queryParams: { eventType: 4 } });

}
}
