import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  constructHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };
  }

  public login(username: string, password: string) {
    const url = `${
      this.serverUrl
    }/auth/login?username=${username}&password=${encodeURIComponent(password)}`;
    return this.http.post(url, {}, this.constructHttpOptions()).toPromise();
  }

  public signUp(data: {
    fullName: string;
    email: string;
    password: string;
    mobile: string;
  }) {
    const url = `${this.serverUrl}/auth/signup`;
    return this.http.post(url, data, this.constructHttpOptions()).toPromise();
  }

  public setToken(tokenPayload: { token: string; expiresIn: string }) {
    // const expiresAt = moment().add(tokenPayload?.expiresIn, 'second');
    localStorage.setItem('token', tokenPayload.token);
    localStorage.setItem('expires_at', tokenPayload.expiresIn);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/login']);
  }

  private getExpiration() {
    const expiresAt = localStorage.getItem('expires_at') as string;
    return moment(expiresAt);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
