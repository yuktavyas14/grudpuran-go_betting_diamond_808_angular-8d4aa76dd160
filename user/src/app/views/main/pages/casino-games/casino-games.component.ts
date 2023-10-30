import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-casino-games',
  templateUrl: './casino-games.component.html',
  styleUrls: ['./casino-games.component.scss']
})
export class CasinoGamesComponent implements OnInit {
  casinoSports:any
  gameList:any;
  seriesId;
  seriesName;
  constructor( private ac:ActivatedRoute,private service:MatchService,private toaster:ToastrService, private _router:Router) { }

  ngOnInit(): void {
    this.ac.paramMap.subscribe((param) => {
      this.seriesId = param.get('seriesId');
      this.seriesName = param.get('name');

      this.getMatchList()
      this.getCasinoSports()

    })
    
  }
  getMatchList(){
    let payload = {
      sport_id: '-1',
      series_id:this.seriesId,
      in_play_page: 0,
      is_cup   : '0'
    }
   
    this.service.getMarketWatch(payload).subscribe((res)=>{
      if(res?.status){
        this.gameList = res?.data;
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
  onMatchDetails(match ){
    sessionStorage.setItem('sportId',match.sport_id)
    if(match.match_id =='-6' || match.match_id =='-1018' || match.match_id =='-1023'|| match.match_id =='-1024' || match.match_id =='-1026' || match.match_id =='-1027' || match.match_id =='-1028' ){
      this._router.navigate(['/main/matchdetail',match.match_id])

    }else{
      this._router.navigate(['/main/matchdetails',match.match_id])

    }

  }


  navigateToGame(gameName, popup){    
    if(gameName)
    this._router.navigateByUrl(`/main/game/casino/${gameName}`, { state: { id:popup , name:'Angular' } })
  }

  getCasinoSports(){
    this.service.getCasinoSport().subscribe((res)=>{
      if(res?.status){
      this.casinoSports = res?.data;
      }
    })
  }
}
