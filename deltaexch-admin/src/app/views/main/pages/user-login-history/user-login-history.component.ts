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
import { ActivatedRoute } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-user-login-history',
  templateUrl: './user-login-history.component.html',
  styleUrls: ['./user-login-history.component.css'],
  providers: [DatePipe, ExcelServiceService]
})
export class UserLoginHistoryComponent implements OnInit {
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
searchKeyValue:any=''

  userListData : any;
  deleteBetData : any;
  searchStatementObj = {
    account_type: 'All',
      sport_id:  '',
      search_client:  '',
      is_download: 0,
      page: 1,
    from_date: '',
    to_date: '',
    search: ''
  };
  userName:any=''
  constructor(private toster : ToastrService, private excelService: ExcelServiceService,
    private activatedRoute:ActivatedRoute,
     private datePipe: DatePipe, private service: UserService,
     private matchservice:MatchService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams
      .subscribe(params => {
        this.userName = params.user;
        console.log(this.userName); // price
      }
    );


    this.date.setDate(this.date.getDate() - 10);
    this.acountGroup = this.fb.group({
      'search': new FormControl(this.userName),
    })





// Sets today's date as default.
this.searchStatementObj.from_date = this.convert(new Date());
this.searchStatementObj.to_date = this.convert(new Date());
this.page = 1

this.getDeleteBetStatementReport(this.page);
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

  getDeleteBetStatementReport(page) {

    let payload = {
      page: page
    }

    this.service.getUserLoginHistory(payload).subscribe((res)=>{
      if(res?.status){
        this.deleteBetData= res.data.data
        if (res.data.total_count && page == 1) {
          this.totalCount = res.data.total_count;
        }
        this.config = {
          currentPage: page,
          itemsPerPage: res?.data?.limit,
          totalItems: this.totalCount
        }

      }else{

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
    this.getDeleteBetStatementReport(this.page)
  }



}
