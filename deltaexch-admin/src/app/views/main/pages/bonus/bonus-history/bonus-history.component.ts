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
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-bonus-history',
  templateUrl: './bonus-history.component.html',
  styleUrls: ['./bonus-history.component.css']
})
export class BonusHistoryComponent implements OnInit {
  bounsStatementList : any = []


  constructor(private toster : ToastrService,
    private excelService: ExcelServiceService,
    private datePipe: DatePipe,
     private service: UserService,
     private matchservice:MatchService,
      private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getBonusStatementReport();
  }

// Sets today's date as default.

  getBonusStatementReport() {
    this.bounsStatementList = [];
    let payload = {

    }

    this.matchservice.getUserBonusHistory().subscribe((res)=>{
      if(res?.status){
        this.bounsStatementList = res?.data;
      }else{

      }
    })
  }

}
