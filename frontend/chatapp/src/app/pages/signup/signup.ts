import { Component, inject } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  private fb: FormBuilder = inject(FormBuilder);
  private auth: AuthenticationService = inject(AuthenticationService);

  signupGroup = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(32)]],
    email: ['', [Validators.required, Validators.pattern(/\w+@\w+.(ca|com)/), Validators.maxLength(32)]],
    password: ['', [Validators.required, Validators.maxLength(32)]],
  });

  onSubmit(): void {
    if (this.signupGroup.status === "INVALID") return;
    const { username, email, password } = this.signupGroup.value;

    if (!(username && email && password)) return;

    this.auth.signup(
      { username, email, password },
      () => {
        console.log(this.auth.fetchToken());
      },
      (err: string) => {
        console.log(this.auth.fetchToken());
      }
    )
  }
}
