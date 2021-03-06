import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Auth} from '../../../../core/model/auth.model';
import { AuthService} from '../../../../core/services/auth/auth.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  url = environment.baseUrl;
  public checkoutForm: FormGroup;
  users: Auth[];
  datosIncorrectos:boolean=false;


  constructor(
    private form: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.checkoutForm = this.form.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)],),
    });
  };


  async ngOnInit(): Promise<void> {
  }


  public async submit($event: Event): Promise<void> { //login(checkoutForm: FormGroupDirective)
    $event.preventDefault();
    if (this.checkoutForm.valid) {
      try {
        await this.authService.login(this.checkoutForm.value).toPromise();
        this.router.navigateByUrl('dashboard/overview');
      } catch (error) {
        this.datosIncorrectos=true;
        
        console.log('Los datos ingresados son incorrectos');
      }
    }
  }
}
