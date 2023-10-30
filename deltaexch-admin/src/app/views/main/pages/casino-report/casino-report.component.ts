import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-casino-report',
  templateUrl: './casino-report.component.html',
  styleUrls: ['./casino-report.component.css']
})
export class CasinoReportComponent implements OnInit {
  fromDate = new Date();
  toDate = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
