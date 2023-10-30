import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-worli',
  templateUrl: './worli.component.html',
  styleUrls: ['./worli.component.css']
})
export class WorliComponent implements OnInit {
  gameList:any;
  seriesId;
  seriesName;
  constructor(private ac:ActivatedRoute,private service:MatchService,private toaster:ToastrService, private _router:Router) { }


  ngOnInit(): void {
    this.ac.paramMap.subscribe((param) => {
      this.seriesId = param.get('seriesId');
      this.seriesName = param.get('seriesName');

      this.getMatchList()

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
  onMatchDetails(matchId){
    this._router.navigate(['/main/matchdetails',matchId])

  }

}
