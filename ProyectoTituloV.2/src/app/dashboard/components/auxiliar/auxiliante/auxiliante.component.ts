import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-auxiliante',
  templateUrl: './auxiliante.component.html',
  styleUrls: ['./auxiliante.component.scss'],
})
export class AuxilianteComponent implements OnInit {

  constructor(private router: Router
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

  ngOnInit() {}

  
}
