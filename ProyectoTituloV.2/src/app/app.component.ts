import { Component } from '@angular/core';
// import {Chart, registerables}  from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  // title = 'dashboard';
  // public chart: any = null;

  // constructor() {
  //   Chart.register(...registerables);
  // }

  // ngOnInit() {

  //   // socket.on('data1', (res) => {
  //   //   this.updateChartData(this.chart, res, 0);
  //   //   this.updateChartData(this.doughnut,res.slice(0,5), 0);
  //   // })

  //   // socket.on('data2', (res) => {
  //   //   this.updateChartData(this.chart, res, 1);
  //   // })

  //   this.chart = new Chart('canvas', {
  //     type: 'line',
  //     options: {
  //       responsive: true,
  //       plugins:{
  //         title: {
  //           display: true,
  //           text: 'Combo Bar and line Chart'
  //         },
  //       }
  //     },
  //     data: {
  //       labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
  //       datasets: [
  //         {
  //           label: 'My First dataset',
  //           data: [243, 156, 365, 30, 156, 265, 356, 543],
  //           backgroundColor: 'rgba(255,0,255,0.4)',
  //           borderColor: 'rgba(255,0,255,0.4)',
  //           fill: false,
  //         },
  //         {
  //           label: 'My Second dataset',
  //           data: [243, 156, 365, 30, 156, 265, 356, 543].reverse(),
  //           backgroundColor: 'rgba(0,0,255,0.4)',
  //           borderColor: 'rgba(0,0,255,0.4)',
  //           fill: false,
  //         }
  //       ]
  //     }
  //   });

  //   let options = {
  //     // aspectRatio: 1,
  //     // legend: false,
  //     tooltips: false,

  //     elements: {
  //       point: {
  //         borderWidth: function (context) {
  //           return Math.min(Math.max(1, context.datasetIndex + 1), 8);
  //         },
  //         hoverBackgroundColor: 'transparent',
  //         hoverBorderColor: function (context) {
  //           return "red";
  //         },
  //         hoverBorderWidth: function (context) {
  //           var value = context.dataset.data[context.dataIndex];
  //           return Math.round(8 * value.v / 1000);
  //         },
  //         radius: function (context) {
  //           var value = context.dataset.data[context.dataIndex];
  //           var size = context.chart.width;
  //           var base = Math.abs(value.v) / 1000;
  //           return (size / 24) * base;
  //         }
  //       }
  //     }
  //   };

  // }

  // addData(chart, label, data) {
  //   chart.data.labels.push(label);
  //   chart.data.datasets.forEach((dataset) => {
  //       dataset.data.push(data);
  //   });
  //   chart.update();
  // }

  // removeData(chart) {
  //   chart.data.labels.pop();
  //   chart.data.datasets.forEach((dataset) => {
  //       dataset.data.pop();
  //   });
  //   chart.update();
  // }

  // updateChartData(chart, data, dataSetIndex){
  //   chart.data.datasets[dataSetIndex].data = data;
  //   chart.update();
  // }
}
