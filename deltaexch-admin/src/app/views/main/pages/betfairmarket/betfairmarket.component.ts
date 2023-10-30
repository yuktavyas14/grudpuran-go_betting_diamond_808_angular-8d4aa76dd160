import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-betfairmarket',
  templateUrl: './betfairmarket.component.html',
  styleUrls: ['./betfairmarket.component.css']
})
export class BetfairmarketComponent implements OnInit {
  marketList:any = [];
  sportId:any;
  sereiesId:any;
  matchId:any;
  constructor(private ac:ActivatedRoute,private service:MatchService, private toaster:ToastrService) { }

  ngOnInit(): void {
    this.ac.params.subscribe((param)=>{
      this.sereiesId = param.seriesId,
      this.sportId = param.sportId,
      this.matchId = param.matchId
    })
    this.getMarketList();
  }
  /**
   * for fatching the market List
   */
  getMarketList(){
    let payload = {
      sport_id: this.sportId,
      series_id: this.sereiesId,
      match_id:this.matchId
    }
    this.service.getMarketList(payload).subscribe((res)=>{
      if(res.status){
       this.marketList =res.data;
      }else{
        this.toaster.error(res?.message)
      }
    })
    }
    createMarket(market){
      let payload = {
        sport_id:this.sportId,
        series_id:this.sereiesId,
        match_id:this.matchId,
        market_id:market.market_id
      }
      this.service.createMarket(payload).subscribe((res)=>{
        if(res?.status){
          this.getMarketList();
          this.toaster.success(res?.message);
        }else{
          this.toaster.error(res?.message);
        }
      })
    }
  }


