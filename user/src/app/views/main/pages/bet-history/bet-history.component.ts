import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.scss']
})
export class BetHistoryComponent implements OnInit {

  constructor(private service: MatchService) { }
  betlist:any = []
  sportId:any='4';
  betType:any='M';
  fromDate = new Date();
  toDate = new Date();
  page = 1;

  limit=10;
  totalrecored;
  config;

itemsPerPage;
  sportList:any = [];
  ngOnInit(): void {
    this.getSportList()
  }

  getSportList(){
    let payload = {
      is_active :''
    }
    this.service.getSportList(payload).subscribe((res)=>{
      if(res?.status){
      this.sportList = res?.data;
      }
    })
  }
  getBetHistory(){
    let payload={
      page :this.page,
      sport_id: this.sportId,
       bet_type:this.betType,
      from_date :this.fromDate,
      to_date  :this.toDate


    }
   this.service.getBetHistory(payload).subscribe((res)=>{
     if(res?.status){
       this.betlist = []
      this.betlist = res?.data?.data;
      if(res?.data?.total?.total_count != 0){
        this.totalrecored = res?.data.total?.total_count;
      }
      this.itemsPerPage = res?.data?.limit;

      this.config = {
       currentPage: this.page,
       itemsPerPage: this.itemsPerPage,
       totalItems: this.totalrecored
   };
     }else{

     }
   })
  }
  trackByFn(index, item) {
    return index; // or item.id
}
  pageChange(newPage: number) {
    this.page = newPage;
    this.getBetHistory();
  }

}
