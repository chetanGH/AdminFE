import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-chartcomponent',
  templateUrl: './chartcomponent.component.html',
  styleUrls: ['./chartcomponent.component.scss']
})
export class ChartcomponentComponent implements OnInit,AfterViewInit {
  
  @Input() id; // target HTML element id from source.
  @Input() chartType; // type of chart to be rendered.
  @Input() data; // chart data options.
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    switch (this.chartType) {
      case 'pie': 
                  Highcharts.chart(this.id, this.data);
                  break;
      case 'area': Highcharts.chart(this.id, this.data);
                  break;
      case 'line': Highcharts.chart(this.id, this.data);
                  break;
      case 'column':console.log("column...",this.data); 
                    Highcharts.chart(this.id, this.data);
                    break;
      default: Highcharts.chart(this.id, this.data);
              break;
    }
  }

}
