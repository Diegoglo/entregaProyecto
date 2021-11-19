import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
// import { basename } from 'path';
import io from 'socket.io-client';

import { Utils } from 'tslint';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {


  title = 'dashboard';
  public chartPulso: any = null;
  public chartGsr: any = null;
  public chartSpO2: any = null;
  socket: any = null;
  pulseData: any = [];
  gsrData: any = [];
  spo2Data: any = [];
  transmitting: boolean = false;

  constructor() {
    
  }

  ngOnInit() {

    this.chartPulso = new Chart('pulso', {
      type: 'line',
      options: {
        responsive: true,
        plugins:{
          title: {
            display: true,
            text: 'Combo Bar and line Chart'
          },
        }
      },
      data: {
        datasets: [
          {
            label: 'pulse',
            data: this.pulseData,
            backgroundColor: 'rgba(34, 209, 240 )',
            borderColor: 'rgba(34, 209, 240 )',
            fill: false,
          },
        ]
      }
    });

    this.chartGsr = new Chart('gsr', {
      type: 'line',
      options: {
        responsive: true,
        plugins:{
          title: {
            display: true,
            text: 'Combo Bar and line Chart'
          },
        }
      },
      data: {
        datasets: [
          {
            label: 'gsr',
            data: this.gsrData,
            backgroundColor: 'rgba(233, 239, 37)',
            borderColor: 'rgba(233, 239, 37)',
            fill: false,
          }
        ]
      }
    });
    
    this.chartSpO2 = new Chart('spo2', {
      type: 'line',
      options: {
        responsive: true,
        plugins:{
          title: {
            display: true,
            text: 'Combo Bar and line Chart'
          },
        }
      },
      data: {
        datasets: [
          {
            label: 'spo2',
            data: this.spo2Data,
            backgroundColor: 'rgba(240, 115, 34)',
            borderColor: 'rgba(240, 115, 34)',
            fill: false,
          },
        ]
      }
    });

  }


  updateHRSignal(pulsimeter) {

    this.pulseData.push(pulsimeter.pulso);
    this.spo2Data.push(pulsimeter.spo2);

    if(this.pulseData.length > 10){
      this.pulseData.shift();
      this.spo2Data.shift();
    }
    console.log(`dataSet: ${this.chartPulso.data.datasets[0].data.length}`);
    console.log(`array: ${this.pulseData.length}`);

    this.chartPulso.update();
    this.chartSpO2.update()
  }

  updateGsrSignal(gsr) {
    this.gsrData.push(gsr.value);

    if(this.gsrData.length > 10){
      this.gsrData.shift();
    }
    this.chartGsr.update();
  }

  listenSignals() {
    this.socket = io('http://localhost:3000');
    this.transmitting = true;

    this.socket.on('server:data:pulse', (pulsimeter: any) => {
      this.updateHRSignal(pulsimeter);
    });

    this.socket.on('server:data:gsr', (gsr: any) => {
      this.updateGsrSignal(gsr);
    });
    
  }

  stopSignals() {
    this.socket.disconnect();
    this.transmitting = false;
  }

}
