import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {}

  async loginUser() {
    try {
      const res: any = await this.authSvc.login(this.username, this.password);
      if (res) {
        this.authSvc.setToken({ token: res.token, expiresIn: res.expiresIn });
        this.router.navigate(['/home']);
        this.toastSvc.success('Login Successful.', 'WELCOME');
      }
    } catch (error: any) {
      console.error(error);
      this.toastSvc.error('Login Failed.', 'Error');
    }
  }

  disableSaveBtn() {
    return !this.username || !this.password;
  }
}
