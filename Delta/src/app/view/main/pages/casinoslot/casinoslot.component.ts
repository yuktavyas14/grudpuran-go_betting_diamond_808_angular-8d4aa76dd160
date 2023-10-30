import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
declare var $: any;
@Component({
  selector: 'app-casinoslot',
  templateUrl: './casinoslot.component.html',
  styleUrls: ['./casinoslot.component.scss']
})
export class CasinoslotComponent implements OnInit {
  sportList : any;
  sportId   : any;
  gameList  : any;
  openWelcomePopup:any;
  imageUrl= {
    "Cricket": '',
    "Soccer" : '',
    "Tennis" : ''
  }
  selectedID : any = 4;
  seriesList:any;
  cupList:any;

  constructor(private matchService : MatchService, public _router: Router) {
    this.getSeriesList();
    this.getCupsForMenu();
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



  getMatchList(){
    let payload = {
      sport_id: '4',
      in_play_page: 1
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
    this.selectedID = sportsID;
    let payload = {
      sport_id: sportsID,
      in_play_page: 1
    }
    this.matchService.getMarketWatch(payload).subscribe((res:any)=>{
      if(res?.status){
        this.gameList = res?.data;
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
}
