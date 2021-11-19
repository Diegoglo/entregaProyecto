import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public buildFormGroup(controlsConfig: any): FormGroup {
    return this.formBuilder.group(controlsConfig);
  }

  public controlIsInvalid(form: FormGroup, controlName: string): boolean{
    const control: AbstractControl = form.get(controlName);
    return (control.invalid);
  }

  public controlIsRequired(form: FormGroup, controlName: string): boolean{
    const control: AbstractControl = form.get(controlName);
    return (control.hasError('required'));
  }

  public controlIsInvalidPattern(form: FormGroup, controlName: string): boolean {
    const control: AbstractControl = form.get(controlName);
    return (control.hasError('pattern'));
  }

  public controlPatternRequired(form: FormGroup, controlName: string): boolean{
    const control: AbstractControl = form.get(controlName);
    return (control.hasError('pattern'));
  }

  public controlIsInvalidEmail(form: FormGroup, controlName: string): boolean{
    const control: AbstractControl = form.get(controlName);
    return control.errors?.email;
  }

  public controlIsInvalidRut(form: FormGroup, controlName: string): boolean {
    const control: AbstractControl = form.get(controlName);
    return (control.hasError('rut_invalid'));
  }

  public controlIsInvalidLength(form: FormGroup, controlName: string): boolean {
    const control: AbstractControl = form.get(controlName);
    return control.hasError('maxlength') || control.hasError('minlength');
  }

}