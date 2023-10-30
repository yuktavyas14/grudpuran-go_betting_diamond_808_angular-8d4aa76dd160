import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchService } from 'src/app/core/services/match.service';
// PDF Maker Settings
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/model/user';
import { Router } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare var $;

@Component({
  selector: 'app-withdraw-statement',
  templateUrl: './withdraw-statement.component.html',
  styleUrls: ['./withdraw-statement.component.css'],
  providers: [DatePipe, ExcelServiceService]
})
export class WithdrawStatementComponent implements OnInit {

  sportList      : any = []

  flagGametypeUL : Boolean
  flagGametypeGR  :Boolean
  public exampleData: any;
  page = 1;
  config                        : any
  last_balance =0;
  match_id
  totalCount : any;
  market_id
  acountGroup: FormGroup;
  userlist :any ;
  searchKey = new FormControl('')
  totalSum : number = 0;
  total_db= 0;
  total_cr = 0;
  opening:any;
  acountStatementList: any = []
  date = new Date()
  userListData : any;
  searchStatementObj = {
    account_type: '',
      sport_id:  '',
      search_client:  '',
      is_download: 0,
      page: 1,
    from_date: '',
    to_date: '',
    search: ''
  };
  useradmininfo       = new User().getData();
  reject_reason:any;
  manual_reason:any;
  paymentWithdrawRequestId= false;

  constructor(private toaster : ToastrService, private excelService: ExcelServiceService,
     private datePipe: DatePipe, private service: UserService,
     private matchservice:MatchService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {


    this.searchKey.valueChanges.subscribe(value => {
      this.getAccountStatementReport(this.page)
    });

    this.date.setDate(this.date.getDate() - 10);
    this.acountGroup = this.fb.group({
      'account_type': new FormControl('',Validators.required),

    })





// Sets today's date as default.
this.searchStatementObj.from_date = this.convert(new Date());
this.searchStatementObj.to_date = this.convert(new Date());
this.page = 1
this.getAccountStatementReport(this.page);
  }
  private convert(str) {
    const date = new Date(str);
    const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }


  transformtValue(value) {
    return Math.abs(value)
  }

  getAccountStatementReport(page) {
    let payload = {
      status: this.acountGroup.controls.account_type.value,
      page: page,
    }

    this.service.getPaymentWithdrawList(payload).subscribe((res)=>{
      if(res?.status){
        this.acountStatementList = res?.data?.data;

        if (res.data.total && page == 1) {

          this.totalCount = res.data.total;
        }
        this.config = {
          currentPage: page,
          itemsPerPage: res?.data?.limit,
          totalItems: this.totalCount
        }
        // this.opening = res?.data?.opening;
        //this.last_balance=(res?.data.data[res?.data.data.length - 1].balance)
      }
    })
  }
  manualWithdrawRequestModal(report:any){
    this.paymentWithdrawRequestId= report.id;
    $('#modalDepositWithdrawMunal').modal('show')
  }
  rejectWithdrawRequestModal(report:any){
    this.paymentWithdrawRequestId= report.id;
    $('#modalDepositWithdraw').modal('show')
  }
  rejectWithdrawRequest() {
    if(this.reject_reason ==undefined || this.reject_reason ==''){
      this.toaster.error('Reject Reason is Required')
      return
    }
    let payload = {
      payment_withdraw_request_id: this.paymentWithdrawRequestId,
      reject_reason: this.reject_reason,
    }

    this.service.rejectWithdrawRequest(payload).subscribe((res)=>{
      if(res?.status){
        $('#modalDepositWithdraw').modal('hide')
        this.toaster.success(res?.message)
        this.reject_reason=''
        this.getAccountStatementReport(this.page);
      }else{
        this.toaster.error(res?.message)

      }
    })
  }
  acceptWithdrawRequest(report:any) {

    let payload = {
      payment_withdraw_request_id: report.id,
    }

    this.service.acceptWithdrawRequest(payload).subscribe((res)=>{
      if(res?.status){
        this.toaster.success(res?.message)
        this.getAccountStatementReport(this.page);
      }else{
        this.toaster.error(res?.message)
      }
    })
  }
  manualWithdrawRequest() {

    if(this.manual_reason ==undefined || this.manual_reason ==''){
      this.toaster.error('Munal Reason is Required')
      return
    }
    let payload = {
      payment_withdraw_request_id: this.paymentWithdrawRequestId,
      manual_reason: this.manual_reason,
    }

    this.service.manualWithdrawRequest(payload).subscribe((res)=>{
      if(res?.status){
        $('#modalDepositWithdrawMunal').modal('hide')
        this.toaster.success(res?.message)
        this.manual_reason=''
        this.getAccountStatementReport(this.page);
      }else{
        this.toaster.error(res?.message)
      }
    })
  }
  manualWithdrawRequest1(report:any) {

    let payload = {
      payment_withdraw_request_id: report.id,
    }

    this.service.manualWithdrawRequest(payload).subscribe((res)=>{
      if(res?.status){
        this.toaster.success(res?.message)
        this.getAccountStatementReport(this.page);
      }else{
        this.toaster.error(res?.message)
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

     /**
   * Generate PDF from JSON Data.
   */





  pageChange(page) {
    this.searchStatementObj.page = page;
    this.page = page
    // this.getUserAccountStatements(this.searchStatementObj);
    this.getAccountStatementReport(this.page)
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


  /**
   * This method is used for change game name
   * @param value as Account type
   */
  changType(value){
    this.flagGametypeUL = false
    this.flagGametypeGR = false
    if(value == 'BR'){
      this.flagGametypeUL = true
    }
      if(value == 'GR')
      this.flagGametypeGR = true
  }
  onAccountStatment(user:any){
this.router.navigate(['/main/account-statement'], { queryParams: { user: user } })
  }

}

