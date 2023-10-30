import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-market-analysis',
  templateUrl: './market-analysis.component.html',
  styleUrls: ['./market-analysis.component.css']
})
export class MarketAnalysisComponent implements OnInit {

  constructor(private service : MatchService) { }
  inplayMatchList= [];
  ngOnInit(): void {
    this.getMarketWatchInplay()
  }
  getMarketWatchInplay(){
    this.service.getMarketWatchInplay().subscribe((res)=>{
      if(res?.status){
        this.inplayMatchList = res?.data
      }
    })
  }

}
