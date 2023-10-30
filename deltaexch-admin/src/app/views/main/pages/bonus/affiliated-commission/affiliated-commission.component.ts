import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchService } from 'src/app/core/services/match.service';
// PDF Maker Settings
import { DatePipe } from '@angular/common';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-affiliated-commission',
  templateUrl: './affiliated-commission.component.html',
  styleUrls: ['./affiliated-commission.component.css']
})
export class AffiliatedCommissionComponent implements OnInit {
  public exampleData: any;
  bounsStatementList : any = []
  code:any;

  constructor(private toster : ToastrService,
    private excelService: ExcelServiceService,
    private datePipe: DatePipe, private service: UserService,
    private matchservice:MatchService, private fb: FormBuilder,
    private ac:ActivatedRoute) {
      this.ac.paramMap.subscribe((param)=>{
        this.code = param.get('code');
      })
     }

  ngOnInit(): void {
    this.getBonusStatementReport();
  }

// Sets today's date as default.

  getBonusStatementReport() {
    this.bounsStatementList = [];
    let payload = {
      "affiliate_referal_code": this.code
    }

    this.matchservice.getUserAffiliatedCommission(payload).subscribe((res)=>{
      if(res?.status){
        this.bounsStatementList = res?.data;
      }else{

      }
    })
  }

}

