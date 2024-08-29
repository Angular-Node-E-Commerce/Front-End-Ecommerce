import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersRequestService } from '../../services/users-request.service';
import { AuthService } from '../../services/auth.service'; // Adjust the path as necessary

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usersRequestService: UsersRequestService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*[a-z]).{8,}$/)],
      ],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  handleSubmitForm() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.usersRequestService.login(email, password).subscribe(
        (response) => {
          console.log('Login successful:', response); // Log the entire response object
          this.authService.setToken(response.token); // Save the token
          this.authService.setRole(response.role); // Save the role

          if (response.role === 'admin') {
            this.router.navigate(['/admin-page']);
          } else {
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.error('Login error:', error);
          // Handle login error
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  getErrorMessage(error: any): string {
    switch (error.status) {
      case 401:
        return 'Unauthorized access. Please check your credentials.';
      case 404:
        return 'User not found. Please check your email.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }
}
