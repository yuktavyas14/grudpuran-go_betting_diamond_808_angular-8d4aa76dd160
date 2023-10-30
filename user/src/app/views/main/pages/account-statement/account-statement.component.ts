import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.scss'],
  providers: [DatePipe]
})
export class AccountStatementComponent implements OnInit {
  todateDate = new Date();
  fromDate = new Date();
  toDate = new Date();
  page = 1;

  limit=10;
  totalrecored;
  config;
  accountReportList :any = []
  openingList:any;
  type='All'
  itemsPerPage:any;
  userListData:any;
  totalSum:any;
  match_id:any;
  market_id:any;
  constructor(private service:MatchService,private toaster:ToastrService,private datePipe: DatePipe) { 
    var date = new Date();
    date.setDate(date.getDate() - 7);
    this.fromDate = date;
    this.getAccountStatment();  
  }
  
 
  ngOnInit(): void {
  }
  trackByFn(index, item) {
    return index; // or item.id
}
  pageChange(newPage: number) {
    this.page = newPage;
    this.getAccountStatment();
  }
  getAccountStatment(){
    let payload = {
      page :this.page,
       account_type:this.type,
       from_date: this.datePipe.transform(this.fromDate, 'yyyy-MM-dd'),
       to_date:  this.datePipe.transform(this.toDate, 'yyyy-MM-dd'),
    }
    this.accountReportList = []
    this.openingList = {}
    this.service.getAccountStatement(payload).subscribe((res)=>{
      if(res?.status){
      this.accountReportList = res?.data?.data;
      this.openingList = res?.data?.opening
      if(res?.data?.total != 0){
        this.totalrecored = res?.data.total;
      }
      this.itemsPerPage = res?.data?.limit;

      this.config = {
       currentPage: this.page,
       itemsPerPage: this.itemsPerPage,
       totalItems: this.totalrecored
   };
      }else{
      // this.toaster.error(res?.message);
      }
    })
  }
  
  getBetsByMatchId(match_id,market_id,bet_type){
    this.totalSum = 0
    this.match_id = match_id;
    this.market_id = market_id;
    let payload = {
      match_id:match_id,
      market_id:market_id,
      bet_type:bet_type
    }

    this.service.getBetsByMatchId(payload).subscribe((res)=>{
      if(res?.status){
        // console.log(res, "test")
        this.userListData = res?.data;
        if(this.userListData){
          this.userListData.forEach(element => {
            if(element?.profit_loss){
              this.totalSum = this.totalSum + element?.profit_loss;
            }
          });
        }
      }
    })
  }
  checkNumberPositvie(values: any){
    if(values >= 0){
        return true;
      }
      else{
      return false;
      }
    }

}
