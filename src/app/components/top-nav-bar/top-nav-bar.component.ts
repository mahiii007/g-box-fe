import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
  // providers:[ThemeService]
})
export class TopNavBarComponent implements OnInit {
  profileMenuItems: MenuItem[] = [];
  public checked = true;

  constructor(private authSvc: AuthService, private themeSvc: ThemeService) {
    this.setProfileMenuItem(this);
  }

  ngOnInit(): void {}

  setProfileMenuItem(currentCompRef: TopNavBarComponent) {
    this.profileMenuItems = [
      { label: 'My Profile', icon: 'pi pi-user' },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command(event) {
          currentCompRef.authSvc.logout();
        },
      },
    ];
  }

  changeTheme() {
    if (this.checked) {
      this.themeSvc.switchTheme('arya-purple');
    }

    if (!this.checked) {
      this.themeSvc.switchTheme('saga-purple');
    }
  }
}
