import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppURLS } from 'src/app/shared/models/url.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'ec-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  home = AppURLS.HOME;
  settings = AppURLS.SETTINGS;

  constructor(private usersService: UsersService, private router: Router) {}

  async logout(): Promise<void> {
    await this.usersService.logout();
    this.router.navigate([AppURLS.LOGIN]);
  }
}
