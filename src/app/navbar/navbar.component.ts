import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('menuDrawer') menuDrawer!: MatDrawer;

  constructor(public authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
}
