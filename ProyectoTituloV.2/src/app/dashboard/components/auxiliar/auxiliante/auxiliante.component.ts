import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auxiliante',
  templateUrl: './auxiliante.component.html',
  styleUrls: ['./auxiliante.component.scss'],
})
export class AuxilianteComponent implements OnInit {

  constructor() { 
    interface IInvoice {
      invoiceDate: Date;
      invoiceNumber: string;
      totalAmount: number;
  }
  }

  ngOnInit() {}

  
}
