import { Component, OnChanges, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuxService } from '../../../../core/providers/aux/aux.service'
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
  

  constructor(private router: Router,
    private auxService: AuxService
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
  async ngOnChanges() {
    this.mostrar();
  }
  
}
