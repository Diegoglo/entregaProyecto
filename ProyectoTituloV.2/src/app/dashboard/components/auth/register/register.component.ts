import { Component, OnInit } from '@angular/core';
import {  AbstractControl,
          FormBuilder,
          FormControl,
          FormGroup,
          FormGroupDirective,
          ValidationErrors,
          ValidatorFn,
          Validators } from '@angular/forms';
import { UserProviderService } from '../../../../core/providers/user/user-provider.service';
import { Router } from '@angular/router';

// import { User2} from '../../../../core/model/user2.model';
// import { User } from 'src/app/core/model/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  sexo: FormGroup;
  valorGenero: number;
  registroIncorrecto:boolean = false;

  constructor( private form: FormBuilder, private userService: UserProviderService, private router:Router ) {
      this.sexo = this.form.group({
        masculino: new FormControl(false),
        femenino: new FormControl(false)
      },
      {
        validators: this.checkSexs,
      });

      this.formulario = this.form.group({
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        sexo: this.sexo,
        password: new FormControl('', [Validators.required, Validators.minLength(6)],),
        confirmarContraseña: new FormControl('', [Validators.required])
      },
      {
        validators: this.checkPasswords
      });
  }

  // public genero(): number{
  //   if (this.sexo.get('femenino').value === true){
  //     return this.valorGenero=1;
  //   }else{
  //     return this.valorGenero=0;
  //   }
  // }

  public genero(): number{
    if (this.sexo.get('femenino').value === true){
      return 1;
    }else{
      return 0;
    }
  }

  public registrarse(event: Event, formulario: FormGroupDirective ){
    event.preventDefault();
    if (this.formulario.valid) {
      // this.genero();
      // this.formulario.get('sexo').setValue(this.genero(), this.formulario);
      this.submitUser();
    }

    //formulario.resetForm(); // se resetea en esta parte, porque no se puede asignar como variable, porque la referencia no pasa al padre
  }

  public async submitUser(): Promise<void> {
    try{
      const usuario = {
        nombre:this.formulario.get('nombre').value,
        apellido:this.formulario.get('apellido').value,
        email:this.formulario.get('email').value,
        sexo:this.genero(),
        password:this.formulario.get('password').value,
      };
      await this.userService.addUser(usuario).toPromise();
      this.router.navigateByUrl('dashboard/login');
    } catch(err){
      this.registroIncorrecto=true;
      console.log(err);
    }
  }


  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmarContraseña').value;
    return pass === confirmPass ? null : {
       notSame: true
    };
  };

  checkSexs: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const m = group.get('masculino').value;
    const f = group.get('femenino').value;
    if(!m && !f){
      return {
        twoChecked: true
      };
    }else{
      return null;
    }
  };

  goToLogin(){
    this.router.navigateByUrl('dashboard/login');
  }



  ngOnInit() {

  }

}
