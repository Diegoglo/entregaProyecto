import { Component, OnInit } from '@angular/core';
import {  AbstractControl,
          EmailValidator,
          FormBuilder,
          FormControl,
          FormGroup,
          FormGroupDirective,
          ValidationErrors,
          ValidatorFn,
          Validators } from '@angular/forms';
import { AuxilianteService} from '../../../../core/providers/auxiliante/auxiliante.service'
import { UserProviderService} from '../../../../core/providers/user/user-provider.service'
import { Storage } from '@capacitor/storage';

import jwt_decode from 'jwt-decode';
const ACCESS_TOKEN_KEY = 'my-access-token';


@Component({
  selector: 'app-registro-auxiliar',
  templateUrl: './registro-auxiliar.component.html',
  styleUrls: ['./registro-auxiliar.component.scss'],
})
export class RegistroAuxiliarComponent implements OnInit {

  formAux: FormGroup;
  sexo: FormGroup;
  valorGenero: number;

  constructor(
      private form: FormBuilder,
     private auxService: AuxilianteService,
     private userProvider: UserProviderService
    ) {
    this.formAux = this.form.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit() {}

  public async registrarse(event: Event, formulario: FormGroupDirective ){
    event.preventDefault();
    if (this.formAux.valid) {
      const token = await Storage.get({ key: ACCESS_TOKEN_KEY });
      const decodeToken: any=jwt_decode(token.value);
      const auxiliante={
        user_id: decodeToken.sub,
        nombre:this.formAux.get('nombre').value,
        apellido:this.formAux.get('apellido').value,
        email:this.formAux.get('email').value,
        telefono:this.formAux.get('telefono').value,
      };
      console.log(auxiliante);
      await this.auxService.addAuxiliante(auxiliante).toPromise();
      await this.auxService.getAuxiliante(decodeToken.sub).toPromise();

      // this.submitReport();
    }

    formulario.resetForm(); // se resetea en esta parte, porque no se puede asignar como variable, porque la referencia no pasa al padre
  }

  public async submitReport(): Promise<void> {
    // const token = await Storage.get({ key: ACCESS_TOKEN_KEY });
    // const decodeToken:any=jwt_decode(token.value);
    // console.log(this.formAux.value);

    // const auxiliante={
    //   user_id: decodeToken.sub,
    //   nombre:this.formAux.get('nombre').value,
    //   apellido:this.formAux.get('apellido').value,
    //   email:this.formAux.get('email').value,
    //   telefono:this.formAux.get('telefono').value,
    // };
    // await this.auxService.addAuxiliante(this.formAux.value).toPromise();
  }
}
