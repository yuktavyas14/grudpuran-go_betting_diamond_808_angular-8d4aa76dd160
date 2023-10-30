import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';
import { FormatDatePipe } from 'src/app/core/pipes/format-date.pipe';
// import { FormatDatePipe } from 'src/app/core/pipes/format-date.pipe';
import { MatchService } from 'src/app/core/services/match.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.scss'],
  providers: [DatePipe , FormatDatePipe]
})

export class AccountStatementComponent implements OnInit, AfterViewInit{
  @ViewChild('myInput') myInput !: ElementRef
  AccountStatementSearchForm    : FormGroup;
  accountReportList             : any = [];
  openingList                   : any;
  totalrecored                  : any =  0;
  itemsPerPage                  : any;
  config                        : any
  page                          = 1;
  limit                         = 10;
  offset = 0;
  date                          = new Date();
  maxDate = new Date();
  totalCount: any;
  minDate = new Date();
  minDateTo = new Date();
  maxDateTo = new Date();
  // type='All'
  // itemsPerPage:any;
  searchKey = new FormControl('');
  searchText:any='';

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
      account_type: ['All'],
      from_date   : [new Date(date)],
      to_date     : [new Date()]
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
    if(this.page < newPage){
      this.offset = this.offset + Number(this.limit)
      } else {

        this.offset = this.offset - Number(this.limit)
        if(this.offset < 0){
          this.offset = 0
        }
      }
    this.page = newPage;

    this.getAccountStatment(this.AccountStatementSearchForm.value)
  }

  getAccountStatment(data : any){
    // data['page'] = this.page;
// console.log(data.account_type, "account")

    let payload = {
      page :this.page,
       account_type: data?.account_type,
      from_date : this.datePipe.transform(data?.from_date, 'yyyy-MM-dd'),
      to_date  : this.datePipe.transform(data?.to_date, 'yyyy-MM-dd'),
      // limit: Number(this.limit),
      // offset : this.offset,
      search: this.searchText,

    }

    this.matchService.getAccountStatement(payload).subscribe((res)=>{
      if(res?.status){
      this.accountReportList = res?.data?.data;
      this.openingList = res?.data?.opening
      if (res.data.total && this.page == 1) {
        this.totalCount = res.data.total;
      }
      this.config = {
        currentPage: this.page,
        itemsPerPage: res?.data?.limit,
        totalItems: this.totalCount
      }
      }else{
      // this.toaster.error(res?.message);
      }
    })
  }
  totalSum:any;
  match_id:any;
  market_id:any;
  userListData:any;
  getBetsByMatchId(amount:any ,match_id:any,market_id:any,bet_type:any){
    this.userListData=[]
    if(amount ==0){
      return
    }
    if(market_id ==undefined || market_id ==null || market_id ==''){
      return
    }
    this.totalSum = 0
    this.match_id = match_id;
    this.market_id = market_id;
    let payload = {
      match_id:match_id,
      market_id:market_id,
      bet_type:bet_type
    }

    this.matchService.getBetsByMatchId(payload).subscribe((res:any)=>{
      if(res?.status){
        // console.log(res, "test")
        this.userListData = res?.data;
        if(this.userListData){
          this.userListData.forEach((element:any) => {
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
    ngAfterViewInit(){
      const searchTearms = fromEvent<any>(this.myInput.nativeElement,'keyup').pipe(
        map((event:any)=> event.target.value),
        debounceTime(400),
        distinctUntilChanged()
      );
      searchTearms.subscribe(res=>{
        this.searchText= res;
        this.getAccountStatment(this.AccountStatementSearchForm.value)

      })

    }
    onlimitChange(event:any){
      debugger
      this.limit= event.value;
      this.getAccountStatment(this.AccountStatementSearchForm.value)
      
    }
}
