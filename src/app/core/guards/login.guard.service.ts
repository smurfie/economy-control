import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AppURLS } from 'src/app/shared/models/url.model';
import { AppPropertiesService } from '../services/app-properties.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(
    private users: UsersService,
    private appPropertiesService: AppPropertiesService,
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const path = route.routeConfig?.path;
    let loggedIn = (await this.users.getUserIdLoggedIn()) !== undefined;
    let canActivate = true;

    if (!loggedIn) {
      const defaultUser = await this.appPropertiesService.getDefaultUser();
      if (defaultUser) {
        await this.users.login(defaultUser.username);
        loggedIn = true;
      }
    }

    if (loggedIn && path === AppURLS.LOGIN) {
      canActivate = false;
      this.router.navigate([AppURLS.HOME]);
    } else if (!loggedIn && path !== AppURLS.LOGIN) {
      canActivate = false;
      this.router.navigate([AppURLS.LOGIN]);
    }

    return canActivate;
  }
}
