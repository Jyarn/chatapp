import { inject, Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('chatapp');

  private router = inject(Router);

  constructor() {
    console.log(environment.backendUrl);
  }

  gotoLogin(): void {
    this.router.navigateByUrl("/login");
  }

  gotoSignup(): void {
    this.router.navigateByUrl("/signup");
  }

  gotoHome(): void {
    this.router.navigateByUrl("/");
  }
}
