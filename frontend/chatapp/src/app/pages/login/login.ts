import { Component, inject } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb: FormBuilder = inject(FormBuilder);
  private auth: AuthenticationService = inject(AuthenticationService);

  loginGroup = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(32)]],
    email: ['', [Validators.required, Validators.pattern(/\w+@\w+.(ca|com)/), Validators.maxLength(32)]],
    password: ['', [Validators.required, Validators.maxLength(32)]],
  });

  onSubmit(): void {
    if (this.loginGroup.status === "INVALID") return;
    const { username, email, password } = this.loginGroup.value;

    if (!(username && email && password)) return;

    this.auth.login(
      { username, email, password },
      () => {
        console.log(this.auth.fetchToken());
      },
      (err: string) => {
        console.error(err);
        console.log(this.auth.fetchToken());
      }
    )
  }
}
