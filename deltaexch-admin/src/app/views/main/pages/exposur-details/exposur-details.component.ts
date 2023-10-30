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
  selector: 'app-exposur-details',
  templateUrl: './exposur-details.component.html',
  styleUrls: ['./exposur-details.component.css'],
  providers: [DatePipe, ExcelServiceService]
})
export class ExposurDetailsComponent implements OnInit {
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
      page: 1,
      search: ''
  };
  userName:any=''
  constructor(private toster : ToastrService, private excelService: ExcelServiceService,
    private activatedRoute:ActivatedRoute,
     private datePipe: DatePipe, private service: UserService,
     private matchservice:MatchService, private fb: FormBuilder) {
      this.userDetailForUser();
     }

  ngOnInit(): void {


  }
  userDetailForUser() {

    let payload = {

    }
    this.matchservice.userDetailForUser(payload).subscribe((res) => {
      if (res.status) {

      }
      else {
        // this.toaster.error(res?.message)
      }
    })

  }

  private convert(str) {
    const date = new Date(str);
    const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
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
