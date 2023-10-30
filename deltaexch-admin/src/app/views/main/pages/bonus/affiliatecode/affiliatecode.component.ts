import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchService } from 'src/app/core/services/match.service';
// PDF Maker Settings
import { DatePipe } from '@angular/common';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare const $:any;
@Component({
  selector: 'app-affiliatecode',
  templateUrl: './affiliatecode.component.html',
  styleUrls: ['./affiliatecode.component.css'],
  providers: [DatePipe, ExcelServiceService]
})
export class AffiliatecodeComponent implements OnInit {

  public exampleData: any;
  sportList : any = []
  page = 1;
  config                        : any
  flagGametypeUL : Boolean
  flagGametypeGR  :Boolean
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
  createForm: FormGroup

  constructor(private toster : ToastrService, private excelService: ExcelServiceService,
    private datePipe: DatePipe, private service: UserService,private matchservice:MatchService,
     private fb: FormBuilder, private _router:Router) {
      this.createForm = this.fb.group({
        name: new FormControl('', Validators.required),
        code : new FormControl('', Validators.required),
      } )
     }

  ngOnInit(): void {
    this.searchKey.valueChanges.subscribe(value => {
      this.getAccountStatementReport()
    });
    this.date.setDate(this.date.getDate() - 10);
    this.acountGroup = this.fb.group({
      'search': new FormControl(''),
    })


    this.acountGroup.get("search").valueChanges.subscribe(value => {
    });


// Sets today's date as default.
this.getAccountStatementReport();
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

  getAccountStatementReport() {
    this.acountStatementList = [];
    let payload = {
      search: this.searchKey.value,
    }

    this.matchservice.getAffiliateCode(payload).subscribe((res)=>{
      if(res?.status){
        if (res.data.total) {
          this.totalCount = res.data.total;
        }
        this.config = {
          currentPage: this.page,
          itemsPerPage: res?.data?.limit,
          totalItems: this.totalCount
        }
        this.opening = res?.data?.opening

        let arr = []
        this.total_db=0;
        this.total_cr = 0;

        this.acountStatementList = res?.data;

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
    addAffiliateCode(){
      $("#add-code").modal("show");
    }
    createUser() {
      if(this.createForm.invalid){
        console.log(this.createForm.value)
        return true;
      }

  console.log(this.createForm.value)
      this.matchservice.addAffiliateCode(this.createForm.value).subscribe((res)=>{
        if(res?.status){
            this.toster.success(res?.message);
            this.getAccountStatementReport();
            this.createForm.reset();
            $("#add-code").modal("hide");
        }else{
            this.toster.error(res?.message);
        }
      })
    }
    onBonusHistory(code:any){
      this._router.navigate(['/main/bonus-history',code])
    }
    onAffiliateHistory(code:any){
      this._router.navigate(['/main/affiliate-history',code])

    }
}
