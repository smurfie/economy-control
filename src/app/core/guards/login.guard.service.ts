import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppURLS } from 'src/app/shared/models/url.model';
import { UsersService } from '../services/users.service';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(public users: UsersService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    const loggedIn = (await this.users.getUserIdLoggedIn()) !== undefined;
    if (!loggedIn) {
      this.router.navigate([AppURLS.LOGIN]);
    }
    return loggedIn;
  }
}
