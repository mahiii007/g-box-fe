import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serverUrl = '';

  constructor(private http: HttpClient, private router: Router) {}

  constructHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };
  }

  public login(email: string, password: string) {
    const url = `${this.serverUrl}/api/login`;
    return this.http
      .post(url, { email, password }, this.constructHttpOptions())
      .toPromise();
  }

  public setToken(tokenPayload: { token: string; expiresIn: number }) {
    const expiresAt = moment().add(tokenPayload?.expiresIn, 'second');
    localStorage.setItem('token', tokenPayload.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/login']);
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at') as string;
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
