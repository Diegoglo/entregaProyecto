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
import { Auth} from '../../../../core/model/auth.model';
import { AuthService} from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public checkoutForm: FormGroup;
  users: Auth[];


  constructor(
    private form: FormBuilder,
    private authService: AuthService,
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
        const user = await this.authService.login(this.checkoutForm.value).toPromise();
        console.log(user);
      } catch (error) {
        console.log('Los datos ingresados son incorrectos');
      }
    }
  }
}
