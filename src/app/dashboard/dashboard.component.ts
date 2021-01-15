import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpHelperService } from '../http-helper.service';
import { Table } from 'primeng/table';
import { BehaviorSubject, Observable } from 'rxjs';
import {NotificationserviceService} from '../notificationservice.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products:any = [];
  @ViewChild('dt') table: Table;

  options:any = new BehaviorSubject<any>(null);
  dataObj:Observable<any>;


  constructor(
    public http:HttpHelperService,
    public spinner:NgxSpinnerService,
    public notification:NotificationserviceService

  ) { }

  emptyOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Overall Sales'
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Total percent of sales.'
      }
  
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%'
        }
      }
    },
    series: [{
      name: 'Product',
      colorByPoint: true,
      data: []
    }]
  }
  
  option2:any = new BehaviorSubject<any>(null);
  pieOptions:any;
  pieObj:Observable<any>;
  columnOptions:any;

  ngOnInit(): void {
    this.dataObj = this.options.asObservable();
    this.pieObj = this.option2.asObservable();
    this.fetchItems();
  }

  seriesData:any = [];
  fetchItems(){
    this.spinner.show();
    this.http.getAuth('http://localhost:4000/api/getSalesOrder').subscribe((res)=>{
      if(res){
        if(res['success'] == true){
          this.spinner.hide();
          this.products = res['response'];
          this.seriesData = res['response'].map(i=>{
            if(i.so){
              return { 'name':i.name,'y':i.so.count, 'drilldown':i.name}
            }else{
              return { 'name':i.name,'y':0, 'drilldown':i.name}
            }
          });
          // column data 
          this.options.next({
            chart: {
              type: 'column'
            },
            title: {
              text: 'Overall Sales'
            },
            accessibility: {
              announceNewData: {
                enabled: true
              }
            },
            xAxis: {
              type: 'category'
            },
            yAxis: {
              title: {
                text: 'Total percent of sales.'
              }
          
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              series: {
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  format: '{point.y:.1f}%'
                }
              }
            },
            series: [{
              name: 'Product',
              colorByPoint: true,
              data: this.seriesData
            }]
          });
          this.columnOptions = this.options.value;
  
  
          // pie data
          this.option2.next({
            chart: {
              type: 'pie'
            },
            title: {
              text: 'Overall Sales'
            },
            accessibility: {
              announceNewData: {
                enabled: true
              }
            },
            xAxis: {
              type: 'category'
            },
            yAxis: {
              title: {
                text: 'Total percent of sales.'
              }
          
            },
            legend: {
              enabled: false
            },
            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
            plotOptions: {
              series: {
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  format: '{point.y:.1f}%'
                }
              }
            },
            series: [{
              name: 'Product',
              colorByPoint: true,
              data: this.seriesData
            }]
          });
  
          this.pieOptions = this.option2.value;
        }else{
          this.spinner.hide()
          this.notification.showNotification('error',res['message'])
        }
      }else{
        this.spinner.hide();
      }
    },err=>{
      this.spinner.hide()
      this.notification.showNotification('error',err.message)
    })
  }
}
