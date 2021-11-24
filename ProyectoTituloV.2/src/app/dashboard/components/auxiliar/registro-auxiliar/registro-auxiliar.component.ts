import { Component, OnInit } from '@angular/core';
import {  AbstractControl,
          FormBuilder,
          FormControl,
          FormGroup,
          FormGroupDirective,
          ValidationErrors,
          ValidatorFn,
          Validators } from '@angular/forms';
import { AuxService} from '../../../../core/providers/aux/aux.service'

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
      private auxService: AuxService,
    ) { 
    this.formAux = this.form.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('',[Validators.required]),
    })
  }

  ngOnInit() {}

  public registrarse(event: Event, formulario: FormGroupDirective ){
    event.preventDefault();
    if (this.formAux.valid) {
      console.log(this.formAux.value)
      this.submitReport();
    }

    formulario.resetForm(); // se resetea en esta parte, porque no se puede asignar como variable, porque la referencia no pasa al padre
  }

  public async submitReport(): Promise<void> {
    await this.auxService.addAuxiliante(this.formAux.value).toPromise();
  }
}
