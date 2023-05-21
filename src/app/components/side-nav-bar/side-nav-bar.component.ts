import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss'],
})
export class SideNavBarComponent implements OnInit {
  activeTab = 'My-Drive';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToFavoritePanel() {
    // if (this.activeTab !== 'Favourites') {
    this.setActiveTab('Favourites');
    this.router.navigate(['/home/favourites']);
    // }
  }

  navigateToDrivePanel() {
    // if (this.activeTab !== 'My-Drive') {
    this.setActiveTab('My-Drive');
    this.router.navigate(['/home/mydrive']);
    // }
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  getActiveTab() {
    return this.activeTab ? this.activeTab : 'My-Drive';
  }
}
