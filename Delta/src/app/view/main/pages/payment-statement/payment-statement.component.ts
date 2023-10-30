import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/model/user';
import { FormatDatePipe } from 'src/app/core/pipes/format-date.pipe';
// import { FormatDatePipe } from 'src/app/core/pipes/format-date.pipe';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-payment-statement',
  templateUrl: './payment-statement.component.html',
  styleUrls: ['./payment-statement.component.scss'],
  providers: [DatePipe , FormatDatePipe]
})
export class PaymentStatementComponent implements OnInit {
  AccountStatementSearchForm    : FormGroup;
  accountReportList             : any = [];
  openingList                   : any;
  totalrecored                  : any =  0;
  itemsPerPage                  : any;
  config                        : any
  page                          = 1;
  limit                         = 10;
  date                          = new Date();
  maxDate = new Date();
  minDate = new Date();
  minDateTo = new Date();
  maxDateTo = new Date();
  // type='All'
  // itemsPerPage:any;
  userInfo = new User().getData();

  constructor(private toaster: ToastrService, private datePipe: DatePipe, private formBuilder: FormBuilder, private matchService : MatchService) {
    this.minDate.setDate(this.minDate.getDate() - 30);
    this.maxDate.setDate(this.maxDate.getDate() + 0);
    this.minDateTo.setDate(this.minDateTo.getDate() - 30);
    this.maxDateTo.setDate(this.maxDateTo.getDate() + 0);
    var date = new Date();
    date.setDate(date.getDate() - 7);
   // this.minDate.setDate(this.minDate.getDate() - 30);
    console.log(this.minDate)
    this.AccountStatementSearchForm = this.formBuilder.group({
      status: [''],
      user_id   : this.userInfo.user_id,
      page     : this.page
  });
  this.getAccountStatment(this.AccountStatementSearchForm.value)
   }

  ngOnInit(): void {

    
  }

  // getAccountStatment(data: any){
  //   console.log(data)
  // }
 
  trackByFn(index :any, item :any) {
    return index; // or item.id
}
  pageChange(newPage: number) {
    this.page = newPage;
    this.getAccountStatment(this.AccountStatementSearchForm.value)
  }

  getAccountStatment(data : any){
    // data['page'] = this.page;
// console.log(data.account_type, "account")

    let payload = {
      page :this.page,
      status: data?.status,
      user_id : this.userInfo.user_id
    }

    this.matchService.getPaymentWithdrawList(payload).subscribe((res)=>{
      if(res?.status){
      this.accountReportList = res?.data?.data;
      if(res?.data?.total != 0){
        this.totalrecored = res?.data?.total ? res?.data?.total : 0;
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
