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
import { Ggrreport } from 'src/app/core/model/ggrReport';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-ggr-report',
  templateUrl: './ggr-report.component.html',
  styleUrls: ['./ggr-report.component.css'],
  providers: [DatePipe, ExcelServiceService]
})
export class GgrReportComponent implements OnInit {


  public exampleData: any;
  page = 1;
  config: any;
  totalGGR: any;
  totalStack: any;
  totalCount : any;
  ggrReportGroup: FormGroup;
  searchKey = new FormControl('')
  date = new Date()
  GGRRerotList : any;
  userPercentage:any;
  totalCustomerGGRProfit:any=0;
  userInputValue: any=0;
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
  checkIndex:any=-11;
  totalProfit=0;
  totalLoss=0;
  constructor(private toster : ToastrService, private excelService: ExcelServiceService,
    private datePipe: DatePipe, private service: UserService,private matchservice:MatchService,
     private fb: FormBuilder) {

     }

  ngOnInit(): void {

    this.searchKey.valueChanges.subscribe(value => {
      this.getGGRReport()
    });
    this.date.setDate(this.date.getDate() - 10);
    this.ggrReportGroup = this.fb.group({
      'from_date': new FormControl(this.date),
      'to_date':new FormControl(new Date())
    })




// Sets today's date as default.
this.searchStatementObj.from_date = this.convert(new Date());
this.searchStatementObj.to_date = this.convert(new Date());
this.getGGRReport();
  }
  onCalculateCommision(index,value:any,item){
    this.GGRRerotList[index].ggrCutsome = (item.ggr *  value)/100
    this.checkIndex= index;
    console.log(value);
    let sumOfCustomerArray=  this.GGRRerotList.filter(item =>item.ggr>=0)
    let sumofData=  sumOfCustomerArray.reduce( function(a, b){
      return a + b['ggrCutsome'];
  }, 0);
  this.totalCustomerGGRProfit= sumofData.toFixed(2)
  console.log(this.totalCustomerGGRProfit);



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

  getGGRReport() {
    let payload = {
      from_date :this.datePipe.transform(this.ggrReportGroup.controls.from_date.value , 'yyyy-MM-dd'),
      to_date  : this.datePipe.transform( this.ggrReportGroup.controls.to_date.value, 'yyyy-MM-dd'),
      // is_download: 0,
      // page: this.page
    }

    this.service.getGGRReport(payload).subscribe((res)=>{
      if(res?.status){
        if (res.data) {
          this.GGRRerotList = res.data.data;
          this.GGRRerotList.forEach(element => {
            element.ggrCutsome=0;
            element.inputValue=0;
          });
          console.log('GGRRerotList',this.GGRRerotList)
          this.totalGGR= res.data.total_ggr;
          this.totalStack = res.data.total_stack;
          let sumOfProfit=  this.GGRRerotList.reduce( function(a, b){
            return a + b['profit'];
          }, 0);
          let sumOfLoss=  this.GGRRerotList.reduce( function(a, b){
            return a + b['loss'];
          }, 0);
        this.totalProfit= sumOfProfit.toFixed(0)
        this.totalLoss= sumOfLoss.toFixed(0)

        }


      }else{

      }
    })
  }
  getPositive(values: any){
    if(values >= 0){
      return 'text-success';
    }
    else{
      return 'text-danger';

    }
  }


  checkNumberPositvie(values: any){
    if(values >= 0){
        return true;
      }
      else{
      return false;
      }
    }






  pageChange(page) {
    this.searchStatementObj.page = page;
    this.page = page
    // this.getUserAccountStatements(this.searchStatementObj);
    this.getGGRReport()
  }
  /**
   * Generate PDF from JSON Data.
   */


  generatePdf(action='download') {
    const documentDefinition= this.getDocumentDefinition()
    switch (action){
      case 'open':pdfMake.createPdf(documentDefinition).open('GGR statement Report');
      break;
      case 'print':pdfMake.createPdf(documentDefinition).print('GGR statement Report');
      break;
      case 'download':pdfMake.createPdf(documentDefinition).download('GGR statement Report');
      break;
      default:pdfMake.createPdf(documentDefinition).open('GGR statement Report');
      break;
    }
    // pdfMake.createPdf(documentDefinition).download('GGR statement Report');
  }
  getDocumentDefinition(){
    return {
      content:[
        {
          text:'GGR Report  ' + this.ggrReportGroup.controls.from_date.value.toDateString() + '  To  ' + this.ggrReportGroup.controls.to_date.value.toDateString(),
          bold:true,
          fontSize:20,
          alignment:'center',
          margin:[0,0,0,20]
        }, {
          table: {

            // fillColor: '#ff0000',
            // Remove distasteful border
            // border: [false, false, false, false],
            // widths: ['auto', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
              widths: ["18%", "14%", "11%","11%", "15%","15%","15%"],
            body: [
              // Array for Headers

              [

                {
                  text: 'SportName',
                  style: 'tableHeader',
                  fillColor: '#555555',

                }, {
                  text: 'Stack',
                  style: 'tableHeader',
                  fillColor: '#555555',

                }
                , {
                  text: 'Proft',
                  style: 'tableHeader',
                  fillColor: '#555555',

                }
                , {
                  text: 'Loss',
                  style: 'tableHeader',
                  fillColor: '#555555',

                }
                , {
                  text: 'GGR 100',
                  style: 'tableHeader',
                  fillColor: '#555555',

                }
                , {
                  text: 'Customer GGR %',
                  style: 'tableHeader',
                  fillColor: '#555555',

                }
                , {
                  text: 'Customer GGR ',
                  style: 'tableHeader',
                  fillColor: '#555555',

                }
              ],
              // Array for values
              ...this.GGRRerotList.map(el => {
                return [

                  // sport_name
                  el?.sport_name,
                  //stack
                  el?.stack ? el?.stack  : '0',
                   //profit
                   el?.stack ? el?.profit  : '0',
                    //loss
                  el?.stack ? el?.loss  : '0',
                  // ggr
                  el?.ggr? el?.ggr  : '0',
                  el?.inputValue ? el?.inputValue : '0',
                  // ggr custome
                  el?.ggrCutsome ? el?.ggrCutsome : '0',
                  // Description

                ];
              }),
              [

                {
                  text: 'Total',


                }, {
                  text: this.totalStack,

                }
                , {
                  text: this.totalProfit,

                }
                , {
                  text: this.totalLoss,


                }
                , {
                  text: this.totalGGR,


                }
                , {
                  text: '',


                }
                , {
                  text: this.totalCustomerGGRProfit,


                }
              ],




            ]
          },
          layout: '',

        }
      ]
    }

  }


}


