import { Component, OnChanges, OnInit,Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { AuxilianteService } from '../../../../core/providers/auxiliante/auxiliante.service'
import { Storage } from '@capacitor/storage';

import jwt_decode from 'jwt-decode'
import { reduceEachTrailingCommentRange } from 'typescript';
const ACCESS_TOKEN_KEY = 'my-access-token';


@Component({
  selector: 'app-auxiliante',
  templateUrl: './auxiliante.component.html',
  styleUrls: ['./auxiliante.component.scss'],
})
export class AuxilianteComponent implements OnInit, OnChanges {

  public auxiliantes;
  posicion:string;

  constructor(private router: Router,
    private auxService: AuxilianteService
    ) { 

    interface IInvoice {
      invoiceDate: Date;
      invoiceNumber: string;
      totalAmount: number;
  }
  }

  goToRegisterAux(){
    this.router.navigateByUrl('dashboard/registerAuxiliar');
  }

  public async mostrar(){
    const token = await Storage.get({ key: ACCESS_TOKEN_KEY });
    const decodeToken:any=jwt_decode(token.value);
    this.auxiliantes=  await this.auxService.getAuxiliante(decodeToken.sub).toPromise();
    if (this.auxiliantes){
      this.mostrar();
    }
  }
  
  ngOnInit(){
    this.mostrar();
  }

  goToAction(){
    this.router.navigateByUrl('dashboard/aux_accion');
  }

  public async eliminarAuxiliante(index:number){
    const token = await Storage.get({ key: ACCESS_TOKEN_KEY });
    const decodeToken:any=jwt_decode(token.value);
    this.posicion= String(index)
    const auxilianteDelete= this.auxiliantes[this.posicion]
    await this.auxService.deleteAuxiliante(auxilianteDelete.id).toPromise();
    await this.auxService.getAuxiliante(decodeToken.sub).toPromise();

  }

  

  async ngOnChanges() {
    
    this.mostrar();
  }
  
}
