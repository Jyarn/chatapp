import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observer } from 'rxjs';

export interface Token {
  jwt: string
};

export interface UserDetails {
  username: string,
  email: string,
  password: string,
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private token?: string = undefined;

  createAuthHandler(onSuccess: () => void, onError: (err: string) => void): Partial<Observer<Token>> {
    return {
      next: (res: Token) => {
        this.token = res.jwt;
        onSuccess();
      },
      error: (err: any) => {
        onError(err.error.error);
      }
    }
  }

  fetchToken(): string {
    return this.token ?? "";
  }

  login(user: UserDetails, onSuccess: () => void, onError: (err: string) => void): void {
    this.http.post<Token>(`${environment.backendUrl}/users/login`, user)
      .subscribe(this.createAuthHandler(onSuccess, onError));
  }

  signup(user: UserDetails, onSuccess: () => void, onError: (err: string) => void): void {
    this.http.post<Token>(`${environment.backendUrl}/users/signup`, user)
      .subscribe(this.createAuthHandler(onSuccess, onError));
  }
}
