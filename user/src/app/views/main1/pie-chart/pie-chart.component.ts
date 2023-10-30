import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { MatchService } from 'src/app/core/services/match.service';
 
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  subscription: Subscription;
 

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Banker'], ['Player'], ['Tie']];
  public pieChartData: SingleDataSet = [43, 47, 10];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['#831924','#06518a','#1d7026'],
    },
  ];

  constructor(  private service: MatchService) {
    this.subscription = this.service.getPieChartData().subscribe(res => {
      if (res) {
          this.pieChartData= res.chartDataShow
      } else {
          // clear messages when empty message received
      }
  });
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

}
