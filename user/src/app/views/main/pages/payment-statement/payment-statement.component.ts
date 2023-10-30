import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/model/user';
@Component({
  selector: 'app-payment-statement',
  templateUrl: './payment-statement.component.html',
  styleUrls: ['./payment-statement.component.scss']
})
export class PaymentStatementComponent implements OnInit {
  constructor(private service:MatchService,private toaster:ToastrService) { }
  fromDate = new Date();
  toDate = new Date();
  page = 1;

  limit=10;
  totalrecored;
  config;
  accountReportList :any = []
  openingList:any;
  type=''
  itemsPerPage:any;
  userListData:any;
  totalSum:any;
  match_id:any;
  userInfo = new User().getData();
  market_id:any;
  ngOnInit(): void {
    this.getAccountStatment();
  }
  trackByFn(index, item) {
    return index; // or item.id
}
  pageChange(newPage: number) {
    this.page = newPage;
  }
  getAccountStatment(){
    let payload = {
      page :this.page,
      status:this.type,
      user_id :this.userInfo.user_id,
    }
    this.accountReportList = []
    this.openingList = {}
    this.service.getPaymentWithdrawList(payload).subscribe((res)=>{
      if(res?.status){
      this.accountReportList = res?.data?.data;
      // this.openingList = res?.data?.opening
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
      // this.toaster.error(res?.message);
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
    getStatusClass(values: any){
      if(values=='pending'){
        return 'text-info'
      }
      if(values=='rejected'){
        return 'text-danger'
      }
      if(values=='completed'){
        return 'text-success'
      }
      if(values=='processing'){
        return 'text-warning'
      }
      if(values=='failed'){
        return 'text-warn'
      }
      else{
        return ''

      }

    }

}

