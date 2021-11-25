import { Component, OnInit } from '@angular/core';
import {  AbstractControl,
          FormBuilder,
          FormControl,
          FormGroup,
          FormGroupDirective,
          ValidationErrors,
          ValidatorFn,
          Validators } from '@angular/forms';
import { StringDecoder } from 'string_decoder';
import { UserProviderService } from '../../../../core/providers/user/user-provider.service';
import { User2} from '../../../../core/model/user2.model';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Storage } from '@capacitor/storage';

import jwt_decode from 'jwt-decode'
const ACCESS_TOKEN_KEY = 'my-access-token';



@Component({
  selector: 'app-user-me',
  templateUrl: './user-me.component.html',
  styleUrls: ['./user-me.component.scss'],
})
export class UserMeComponent implements OnInit {

  formulario: FormGroup;
  formPass: FormGroup;
  public cambiarContrasena:boolean=false;

  sexo: FormGroup;
  valorGenero: number;
  id:string='';

  

  constructor(
      private form: FormBuilder,
      private userService: UserProviderService,
      private router: Router,
      private route: ActivatedRoute,
      ) {
      this.formPass= this.form.group({
        password: new FormControl('', [Validators.required, Validators.minLength(6)],),
        confirmarContraseña: new FormControl('', [Validators.required])
      },
      {   
        validators: this.checkPasswords
      });

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
        sexo: null,
      }
    );
  }

  goToOverview(){
    this.router.navigateByUrl('/dashboard/overview', {replaceUrl: true});
  }


  onChange(){

  }

  public registrarse(event: Event, formulario: FormGroupDirective ){
    event.preventDefault();
    if (this.formulario.valid) {
      // this.genero();
      // console.log(this.formulario.value)
      // this.formulario.get('sexo').setValue(this.genero(), this.formulario);
      this.submitUser();
    }

    // formulario.resetForm(); // se resetea en esta parte, porque no se puede asignar como variable, porque la referencia no pasa al padre
  }

  public async submitUser(): Promise<void> {
    const token = await Storage.get({ key: ACCESS_TOKEN_KEY });
    const decodeToken:any=jwt_decode(token.value);
    if (this.formPass.valid){
      console.log(this.formPass.value);
      const usuario = {
        nombre:this.formulario.get('nombre').value,
        apellido:this.formulario.get('apellido').value,
        email:this.formulario.get('email').value,
        sexo:this.genero(),
        password:this.formPass.get('password').value,
    };
    console.log(this.formulario.value);
    console.log(this.formulario.get('nombre').value);
    console.log(usuario);

    await this.userService.updateUser(decodeToken.sub,usuario).toPromise();
    }else{
      const usuario = {
        nombre:this.formulario.get('nombre').value,
        apellido:this.formulario.get('apellido').value,
        email:this.formulario.get('email').value,
        sexo:this.genero(),
    };
    console.log(this.formulario.value);
    console.log(this.formulario.get('nombre').value);
    console.log(usuario);

    await this.userService.updateUser(decodeToken.sub,usuario).toPromise();
    }
  }

  public cambiarContra(){
    this.cambiarContrasena=true;
  }

  public genero(): number{
    if (this.sexo.get('femenino').value === true){
      return 1;
    }else{
      return 0;
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

  public async setUser(): Promise<void> {
    // this.route.params.subscribe(async (params) => {
      // this.id = params.id || '';
      const token = await Storage.get({ key: ACCESS_TOKEN_KEY });
      const decodeToken:any=jwt_decode(token.value);
      if (decodeToken.sub) {
        try {
          const data:any= await this.userService.getUser(decodeToken.sub).toPromise();
          this.setFormSexo(data.sexo);

          this.formulario.setValue({
            nombre: data.nombre,
            apellido: data.apellido,
            email:data.email,
            sexo:this.sexo,
          });

        } catch (error) {
          console.log(error);
        }
      }
    // });
  }

  setFormSexo(sexo){
    if (sexo===0){
      this.sexo.get('masculino').setValue(true);  
      this.sexo.get('femenino').setValue(false);
    }else{
      this.sexo.get('masculino').setValue(false);  
      this.sexo.get('femenino').setValue(true);
    }
  }



  ngOnInit() {
    this.setUser();
  }

}
