import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.css']
})
export class GeneralReportComponent implements OnInit {

  constructor(private service:MatchService) { }
  reportType = 'CR';
  total:any = 0;
  generalReportList= [];
  ngOnInit(): void {
  }


  getGeneralReport(){
    let payload = {
      report_type: this.reportType
        }
    this.service.getGeneralReport(payload).subscribe((res)=>{
      if(res?.status){
        this.generalReportList = res?.data?.data;
        this.total = res?.data?.total
      // console.log(".......................",this.generalReportList)
      }
    })
  }
}
