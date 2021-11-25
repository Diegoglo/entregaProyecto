import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuxilianteService} from '../../../../core/providers/auxiliante/auxiliante.service'
import { AuxilianteComponent } from '../auxiliante/auxiliante.component';
import { Storage } from '@capacitor/storage';
import jwt_decode from 'jwt-decode'
// import { reduceEachTrailingCommentRange } from 'typescript';
const ACCESS_TOKEN_KEY = 'my-access-token';

@Component({
  selector: 'app-accion-auxiliante',
  templateUrl: './accion-auxiliante.component.html',
  styleUrls: ['./accion-auxiliante.component.scss'],
})
export class AccionAuxilianteComponent implements OnInit {

  constructor(private router:Router, private auxService: AuxilianteService) { }

  ngOnInit() {}

  goToAuxilian(){
    this.router.navigateByUrl('dashboard/auxiliante');
  }


  // async eliminarAuxiliante(){
  //   const token = await Storage.get({ key: ACCESS_TOKEN_KEY });
  //   const decodeToken:any=jwt_decode(token.value);

  //   await this.auxService.deleteAuxiliante(decodeToken.sub).toPromise();
  // }


}
