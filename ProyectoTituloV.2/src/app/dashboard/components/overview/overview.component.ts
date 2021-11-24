import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
// import { basename } from 'path';
import io from 'socket.io-client';
import fuzzylogic from 'fuzzylogic';

import { Utils } from 'tslint';
import { timeStamp } from 'console';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit{


  title = 'dashboard';
  public chartPulso: any = null;
  public chartGsr: any = null;
  public chartSpO2: any = null;
  socket: any = null;
  pulseData: any = [];
  gsrData: any = [];
  spo2Data: any = [];
  pulseDataShow: any = [];
  gsrDataShow: any = [];
  spo2DataShow: any = [];

  spo2Label:any = [];
  gsrLabel:any = [];
  pulseLabel:any=[];



  transmitting: boolean = false;

  public LHR: any = []; //Low Heart Rate
  public MHR: any = []; //Medium Heart Rate
  public HHR: any = []; //High Heart Rate
  public GSRL: any = []; //Galvanic Skin Response Level
  public SPN: any = []; //SpO2 Normal
  public status: string= 'No medido';

  constructor() {

  }


  public checkStress() {

    let sumLHR = 0;
    let sumMHR = 0;
    let sumHHR = 0;
    let sumGSR = 0;
    let promLHR = 0;
    let promMHR = 0;
    let promHHR = 0;
    let promGSR = 0;
    const pulseLength = this.pulseData.length;
    const gsrLength = this.gsrData.length;

    //if(pulseLength!==0 && gsrLength!==0){
    //Aquí la función revisa los valores fuzzificados y analiza los que puedan tener índices de estrés
    //Reglas de GSR
    for (let indexHR = 0, indexGsr = 0; indexHR < pulseLength || indexGsr < gsrLength; indexHR++, indexGsr++) {
      if(indexHR < pulseLength){
        sumLHR += this.LHR[indexHR];
        sumMHR += this.MHR[indexHR];
        sumHHR += this.HHR[indexHR];
      }
      if(indexGsr < gsrLength){
        sumGSR += this.GSRL[indexGsr];
      }


    }

    if(pulseLength !== 0) {
      promLHR = sumLHR / pulseLength;
      promMHR = sumMHR / pulseLength;
      promHHR = sumHHR / pulseLength;
    }
    if(gsrLength !== 0) {
      promGSR = sumGSR / gsrLength;
    }

    console.log(sumGSR);


    if (promLHR > promMHR) {

      if (promGSR < 0.333) {
        this.status = "Nivel de estrés bajo";
      }
      else if (promGSR >= 0.333 && promGSR < 0.666) {
        this.status= "Nivel de estrés medio bajo";
      }
      else if (promGSR >= 0.666) {
        this.status = "Nivel de estrés bajo";
      }
    }

    else if (promLHR < promMHR) {

      if (promGSR < 0.333) {
        this.status = "Nivel de estrés bajo";
      }
      else if (promGSR >= 0.333 && promGSR < 0.666) {
        this.status = "Nivel de estrés medio bajo";
      }
      else if (promGSR >= 0.666) {
        this.status = "Nivel de estrés medio";
      }
    }
    else if (promHHR > promMHR) {

      if (promGSR < 0.333) {
        this.status = "Nivel de estrés alto";
      }
      else if (promGSR >= 0.333 && promGSR < 0.666) {
        this.status = "Nivel de estrés alto";
      }
      else if (promGSR >= 0.666) {
        this.status = "Nivel de estrés alto";
      }
    }

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
        labels:this.pulseLabel,
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
        labels: this.gsrLabel,
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
        labels:this.spo2Label,
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

  public gsrMembership(gsrData) {
    //Definición de la Función de Membresía Respuesta Galvánica
    //console.log("gsrl");
    for (let index = 0; index < gsrData.length; index++) {
      const element = gsrData[index];
      this.GSRL[index] = fuzzylogic.grade(element, 0, 500);

    }

  };

  public hearRateMembership(pulseData) {
    //Definición de la Función de Membresía Ritmo Cardíaco
    for (let index = 0; index < pulseData.length; index++) {
      const element = pulseData[index];
      this.LHR[index] = fuzzylogic.triangle(element, 0, 20, 70);
      this.MHR[index] = fuzzylogic.triangle(element, 45, 70, 100);
      this.HHR[index] = fuzzylogic.triangle(element, 84, 135, 150);
    }

    console.log("Ritmo cardíaco BAJO: " + this.LHR);
  };

  public spo2Membership(spo2Data) {
    //Definición de la Función de Membresía Saturación de Oxígeno

    for (let index = 0; index < spo2Data.length; index++) {
      const element = spo2Data[index];
      this.SPN[index] = fuzzylogic.triangle(element, 95, 97, 100);
    }
    //console.log("Niveles de Oxigeno Normal, Baja y Alta: " + SPN[0] + " " + SPL[0] + " " + SPH[0]);
  };


  updateHRSignal(pulsimeter) {

    this.pulseData.push(pulsimeter.pulso);
    this.pulseDataShow.push(pulsimeter.pulso);
    this.spo2Data.push(pulsimeter.spo2);
    this.spo2DataShow.push(pulsimeter.spo2);
    this.spo2Label.push(pulsimeter.createdAt.slice(12,20));
    this.pulseLabel.push(pulsimeter.createdAt.slice(12,20));

    if(this.pulseDataShow.length > 10){
      this.pulseDataShow.shift();
      this.spo2DataShow.shift();
      this.spo2Label.shift();
      this.pulseLabel.shift();
    }

    this.chartPulso.update();
    this.chartSpO2.update()
  }

  updateGsrSignal(gsr) {
    this.gsrData.push(gsr.value);
    this.gsrDataShow.push(gsr.value);
    this.gsrLabel.push(gsr.createdAt.slice(12,20));

    if(this.gsrDataShow.length > 10){
      this.gsrDataShow.shift();
      this.gsrLabel.shift();
    }
    this.chartGsr.update();
  }

  listenSignals() {
    this.socket = io('http://localhost:3000');
    this.transmitting = true;

    this.socket.on('server:data:pulse', (pulsimeter: any) => {
      this.updateHRSignal(pulsimeter);
      this.hearRateMembership(this.pulseData);
      this.spo2Membership(this.spo2Data);
      this.checkStress();
    });

    this.socket.on('server:data:gsr', (gsr: any) => {
      this.updateGsrSignal(gsr);
      this.gsrMembership(this.gsrData);
      this.checkStress();
    });

  }

  stopSignals() {
    this.socket.disconnect();
    this.transmitting = false;
  }

}
