import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

   resetPassword: FormGroup;

   constructor(private fb: FormBuilder) {
    this.resetPassword = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*@%$#]).{8,}$/)]],
      confPassword: ['', Validators.required]}, { validators: this.passwordMatchValidator });
  }
  get password(){
    return this.resetPassword.get('password')
  }

  get confPassword(){
    return this.resetPassword.get('confPassword')
  }

passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confPassword = control.get('confPassword');

  return password && confPassword && password.value !== confPassword.value ? { passwordMismatch: true } : null;
};

  handleSubmitForm() {
    console.log(this.resetPassword.value);
    if (this.resetPassword.valid) {
      // SUBMIT FORM
    }
  }

}
