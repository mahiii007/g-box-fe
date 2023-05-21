import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loginUser() {
    if (this.username && this.password) {
      const token = `${this.username}-${+new Date()}-secure_token`;
      const expiresIn = 600;
      this.authSvc.setToken({ token, expiresIn });
      this.router.navigate(['/home']);
    }
  }
}
