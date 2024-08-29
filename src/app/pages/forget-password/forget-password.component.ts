import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgetPassword: FormGroup;
  constructor(private fb: FormBuilder) {
    this.forgetPassword = this.fb.group({
      email : ['' ,[Validators.required ,Validators.email]],
    });
  }

  get email(){
    return this.forgetPassword.get('email')
  }

  handleSubmitForm() {
    console.log(this.forgetPassword.value);
    if (this.forgetPassword.valid) {
      // SUBMIT FORM
    }
}
}
