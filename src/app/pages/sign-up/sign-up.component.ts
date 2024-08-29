import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UsersRequestService } from '../../services/users-request.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private usersRequestService: UsersRequestService, private router: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])/)]],
    }, { validators: this.passwordMatchValidator });
  }

  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get city() { return this.registerForm.get('city'); }
  get street() { return this.registerForm.get('street'); }
  get country() { return this.registerForm.get('country'); }
  get password() { return this.registerForm.get('password'); }
  get confPassword() { return this.registerForm.get('confPassword'); }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confPassword = control.get('confPassword');
    return password && confPassword && password.value !== confPassword.value ? { passwordMismatch: true } : null;
  };

  handleSubmitForm() {
    console.log('Form submitted');

    Object.values(this.registerForm.controls).forEach(control => control.markAsTouched());

    if (this.registerForm.valid) {
      console.log('Form is valid');

      const formData = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        profile: {
          firstName: this.registerForm.value.firstname,
          lastName: this.registerForm.value.lastname,
          address: {
            country: this.registerForm.value.country,
            city: this.registerForm.value.city,
            street: this.registerForm.value.street
          }
        }
      };

      console.log('Form Data:', formData);

      this.usersRequestService.signUp(formData).subscribe(
        (response) => {
          console.log('Sign-up successful:', response);
          this.router.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          console.error('Sign-up error:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
        }
      );
    } else {
      console.error('Form is invalid');
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          console.error(`${key} is invalid:`, control.errors);
        }
      });
    }
  }
}
