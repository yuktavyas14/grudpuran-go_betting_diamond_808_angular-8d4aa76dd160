import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MatchService } from 'src/app/core/services/match.service';
// PDF Maker Settings
import { DatePipe } from '@angular/common';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css'],
  providers: [DatePipe, ExcelServiceService]
})
export class AccountStatementComponent implements OnInit {
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
     private matchservice:MatchService, private fb: FormBuilder) {
     }

  ngOnInit(): void {

    this.activatedRoute.queryParams
      .subscribe(params => {
        this.userName = params.user;
        console.log(this.userName); // price
      }
    );
    this.searchKey.valueChanges.subscribe(value => {
      this.getAccountStatementReport(this.page)
    });

    this.date.setDate(this.date.getDate() - 10);
    this.acountGroup = this.fb.group({
      'account_type': new FormControl('All',Validators.required),
      'game_type': new FormControl('All',Validators.required),
      'search': new FormControl(this.userName),
      'from_date': new FormControl(this.date),
      'to_date':new FormControl(new Date())
    })


    this.acountGroup.get("search").valueChanges.subscribe(value => {
      this.searchUserList(value)
});

   this.getSportList()

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
  searchUserList(value){
    let payload = {
      user_name : value
    }
    this.matchservice.searchUser(payload).subscribe((res)=>{
      if(res?.status){
        this.userlist = res?.data;
      }
    })

  }

  transformtValue(value) {
    return Math.abs(value)
  }

  getAccountStatementReport(page) {
    this.acountStatementList = [];
    let payload = {
      account_type: this.acountGroup.controls.account_type.value,
      sport_id:  this.acountGroup.controls.game_type.value,
      search_client:  this.acountGroup.controls.search.value,
      search: this.searchKey.value,
      from_date: this.datePipe.transform(this.acountGroup.controls.from_date.value, 'yyyy-MM-dd'),
      to_date:  this.datePipe.transform(this.acountGroup.controls.to_date.value, 'yyyy-MM-dd'),
      is_download: 0,
      // last_balance :this.last_balance,
      page: page
    }

    this.service.getAccountStatement(payload).subscribe((res)=>{
      if(res?.status){
        if (res.data.total && page == 1) {
          this.totalCount = res.data.total;
        }
        this.config = {
          currentPage: page,
          itemsPerPage: res?.data?.limit,
          totalItems: this.totalCount
        }
        this.opening = res?.data?.opening;
        //this.last_balance=(res?.data.data[res?.data.data.length - 1].balance)

        let arr = []
        this.total_db=0;
        this.total_cr = 0;

         arr = res?.data?.data;
        let debt = 0;
        let cred = 0;
        let total = 0;
        for (let item of arr) {
          let obj = {
          }
          if (item.credit_debit <= 0) {
            // total = total + item.credit_debit
            obj['debit'] = item?.credit_debit;
            obj['credit'] = 0;
            this.total_db = this.total_db + this.transformtValue(item?.credit_debit);
          } else {
            // total = total + item.credit_debit
            this.total_cr = this.total_cr - this.transformtValue(item?.credit_debit);
            obj['debit'] = 0;
            obj['credit'] = item?.credit_debit;
          }
          obj['date'] = item?.date;
          obj['description'] = item?.description;
          obj['operator_name'] = item?.operator_name;
          obj['user_name'] = item?.user_name;
          obj['balance'] = item?.balance;
          obj['market_id'] = item?.market_id;
          obj['match_id'] = item?.match_id;

          this.acountStatementList.push(obj);

        }
      }else{

      }
    })
  }
  getBetsByMatchId(match_id,market_id,bet_type){
    this.totalSum = 0
    this.match_id = match_id;
    this.market_id = market_id;
    let payload = {
      match_id: match_id ,
      market_id:market_id,
      bet_type   :bet_type,
      user_name :this.acountGroup.controls.search.value
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

     /**
   * Generate PDF from JSON Data.
   */
  generatePdf(statement) {
    // this.showBackDrop = true;
    const statementObject = Object.assign({}, this.acountGroup.value);
    statementObject.is_download = 1;
    statementObject.search = this.searchKey.value
    statementObject.search_client =  this.acountGroup.controls.search.value
    this.service.getAccountStatement(statementObject).subscribe(
      res => {
        if (res?.status) {
          const pdfRec = res?.data?.data;
          // res?.data?['opening']['operator_name'] =''
          if(res?.data)
          // res?.['data']?.['opening']?.['balance'] = '1500';
          pdfRec.unshift(res?.data?.['opening'])

          const documentDefinition = {
            content: [{
              text: `Account Statements`,
              alignment: 'center',
              fontSize: 20,
              bold: true,
              margin: [0, 0, 0, 20]
            }, {
              table: {

                // fillColor: '#ff0000',
                // Remove distasteful border
                // border: [false, false, false, false],
                // widths: ['auto', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                widths: ["22%", "12%", "12%","12%", "25%","15%"],
                body: [
                  // Array for Headers

                  [

                    {
                      text: 'Date',
                      style: 'tableHeader',

                    }, {
                      text: 'Credit',
                      style: 'tableHeader',

                    }
                    , {
                      text: 'Debit',
                      style: 'tableHeader',

                    }
                    , {
                      text: 'Closing',
                      style: 'tableHeader',

                    }
                    , {
                      text: 'Description',
                      style: 'tableHeader',

                    }
                    , {
                      text: 'Fromto',
                      style: 'tableHeader',

                    }
                  ],
                  // Array for values
                  ...pdfRec.map(el => {
                    return [
                      // Placed
                      new Date(el.date).toDateString(),
                      // credit
                      el?.credit_debit > 0 ? el?.credit_debit  : '0',
                      // debit
                      el?.credit_debit  < 0 ?  el?.credit_debit : '0',
                      // balance
                      el?.balance ? el?.balance : ' ',
                      // Description
                      el?.description ? el?.description : 'N/A',
                       // from to
                      el?.operator_name  ? el?.operator_name + '/' + el?.user_name : ''
                    ];
                  })
                ],
                styles:{
                  name: {
                    fontSize:16,
                    bold:true,
                    width:100
                  }
                }
              },
              layout: 'noBorders',

            }]
          };
          // pdfMake.createPdf(documentDefinition).open();
          pdfMake.createPdf(documentDefinition).download('Account statement Report');
          // this.showBackDrop = false;
        } else {
          // this.showBackDrop = false;
          this.toster.error('Some error has occurred!');
        }
      }
    );
  }




  pageChange(page) {
    this.searchStatementObj.page = page;
    this.page = page
    // this.getUserAccountStatements(this.searchStatementObj);
    this.getAccountStatementReport(this.page)
  }

  /**
   * Generates CSV file of account-statement.
   * @param bethistory (required) takes bethistory object.
   */
  generateCSV(statement) {
    // this.showBackDrop = true;
    const statementObject = Object.assign({}, this.acountGroup.value);
    statementObject.is_download = 1;
    statementObject.search = this.searchKey.value
    statementObject.search_client =  this.acountGroup.controls.search.value


    this.service.getAccountStatement(statementObject).subscribe(
      (response) => {
        if (response.status) {
          let len = response.data.data.length;
          // pdfRec.unshift(res?.data?.['opening'])
          if( response?.data &&   response?.data['opening'] ){
            response?.data?.data?.unshift(response?.data?.['opening'])
          len =  response.data.data.length;
          }
          if (len > 0) {
            const excelAccount = [];
            for (let i = 0; i < len; i++) {
              const obj = {
                Date: this.datePipe.transform((response.data.data[i].date), 'MMM d, y, h:mm:ss a'),

                'Credit' : (response?.data?.data[i]?.credit_debit > 0 ? response?.data?.data[i]?.credit_debit : '0'),
                'Debit': (response?.data?.data[i]?.credit_debit < 0 ? response?.data?.data[i]?.credit_debit : '0'),
                'Closing': (response.data.data[i].balance.toString()),
                // Username: response.data.data[i].user_name,
                Description: (response.data.data[i].description),
                Fromto    : response.data.data[i].user_name ? response.data.data[i].user_name : ''+ '/'+ response.data.data[i].user_name ? response.data.data[i].user_name : '',

              };
              excelAccount.push(obj);
            }
            this.excelService.exportAsExcelFile(excelAccount, 'AccountStatements');
            // this.showBackDrop = false;
          } else {
            // this.showBackDrop = false;
            // this.toasterService.error('No record found!');
          }
        } else {
          // this.showBackDrop = false;
          // this.toasterService.error(response.message);
        }
      }, (error) => {
        // this.showBackDrop = false;
        console.error(error);
      }
    );
  }


    /**
   * for getting list of the sports
   */
     getSportList() {
      let payload = {
        is_active: "1"
      }
      this.matchservice.getSportList(payload).subscribe((res) => {
        if (res.status) {
          this.sportList = res.data;
        }
        else {
          // this.toaster.error(res?.message)
        }
      })

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

}
