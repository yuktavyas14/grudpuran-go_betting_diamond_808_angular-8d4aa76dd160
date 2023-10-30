import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-report',
  templateUrl: './game-report.component.html',
  styleUrls: ['./game-report.component.css']
})
export class GameReportComponent implements OnInit {
  fromDate = new Date();
  toDate = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
