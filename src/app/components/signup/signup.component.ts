import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  password = '';
  confirmPassword = '';
  fullName = '';
  email = '';
  mobile = '';

  constructor(
    private authSvc: AuthService,
    private toastSvc: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async onSignUp() {
    try {
      const data = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        mobile: this.mobile,
      };
      const res: any = await this.authSvc.signUp(data);
      if (res) {
        // if (res?.status === 400) {
        //   this.toastSvc.error('SIGNUP FAILED', res?.message);
        //   return;
        // }
        this.authSvc.setToken({ token: res.token, expiresIn: res.expiresIn });
        this.router.navigate(['/home']);
        this.toastSvc.success('Signup Successful.', 'WELCOME');
      } else {
        this.toastSvc.error('SIGNUP FAILED', 'ERROR');
      }
    } catch (error: any) {
      this.toastSvc.error('SIGNUP FAILED', error?.message);
      console.error(error);
    }
  }

  disableSignInBtn() {
    return (
      !this.fullName || !this.email || !this.password || !this.confirmPassword
    );
  }
}
