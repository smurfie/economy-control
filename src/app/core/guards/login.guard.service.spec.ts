import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppURLS } from 'src/app/shared/models/url.model';
import { User } from 'src/app/shared/models/user.model';
import { AppPropertiesService } from '../services/app-properties.service';
import { UsersService } from '../services/users.service';
import { LoginGuardService } from './login.guard.service';

describe('LoginGuardService', () => {
  const HOME_ROUTE = { routeConfig: { path: AppURLS.HOME } };
  const LOGIN_ROUTE = { routeConfig: { path: AppURLS.LOGIN } };
  const DEFAULT_USER: User = { id: 1, username: 'John' };

  let usersService: UsersService;
  let appPropertiesService: AppPropertiesService;
  let guard: LoginGuardService;
  let router: any;

  beforeEach(() => {
    router = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      imports: [],
      providers: [LoginGuardService, { provide: Router, useValue: router }],
    });
    usersService = TestBed.inject(UsersService);
    appPropertiesService = TestBed.inject(AppPropertiesService);
    guard = TestBed.inject(LoginGuardService);

    spyOn(usersService, 'login');
  });

  afterEach(() => {
    expect(usersService.getUserIdLoggedIn).toHaveBeenCalledTimes(1);
  });

  describe('Authenticated User', () => {
    beforeEach(() => {
      spyOn(usersService, 'getUserIdLoggedIn').and.returnValue(Promise.resolve(1));
      spyOn(appPropertiesService, 'getDefaultUser');
    });

    afterEach(() => {
      expect(usersService.login).not.toHaveBeenCalled();
      expect(appPropertiesService.getDefaultUser).not.toHaveBeenCalled();
    });

    it('should return true when navigating home', async () => {
      expect(await guard.canActivate(HOME_ROUTE as ActivatedRouteSnapshot)).toEqual(true);
    });

    it('should return false when navigating login', async () => {
      expect(await guard.canActivate(LOGIN_ROUTE as ActivatedRouteSnapshot)).toEqual(false);
      expect(usersService.getUserIdLoggedIn).toHaveBeenCalledTimes(1);
    });

    it('should not redirect when navigating home', async () => {
      await guard.canActivate(HOME_ROUTE as ActivatedRouteSnapshot);

      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should redirect to the home page when navigating login', async () => {
      await guard.canActivate(LOGIN_ROUTE as ActivatedRouteSnapshot);

      expect(router.navigate).toHaveBeenCalledWith([AppURLS.HOME]);
    });
  });

  describe('Unauthenticated User with DefaultUser', () => {
    beforeEach(() => {
      spyOn(usersService, 'getUserIdLoggedIn').and.returnValue(Promise.resolve(undefined));
      spyOn(appPropertiesService, 'getDefaultUser').and.returnValue(Promise.resolve(DEFAULT_USER));
    });

    afterEach(() => {
      expect(usersService.login).toHaveBeenCalledOnceWith(DEFAULT_USER.username);
      expect(appPropertiesService.getDefaultUser).toHaveBeenCalledTimes(1);
    });

    it('should return true when navigating home', async () => {
      expect(await guard.canActivate(HOME_ROUTE as ActivatedRouteSnapshot)).toEqual(true);
    });

    it('should return false when navigating login', async () => {
      expect(await guard.canActivate(LOGIN_ROUTE as ActivatedRouteSnapshot)).toEqual(false);
      expect(usersService.getUserIdLoggedIn).toHaveBeenCalledTimes(1);
    });

    it('should not redirect when navigating home', async () => {
      await guard.canActivate(HOME_ROUTE as ActivatedRouteSnapshot);

      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should redirect to the home page when navigating login', async () => {
      await guard.canActivate(LOGIN_ROUTE as ActivatedRouteSnapshot);

      expect(router.navigate).toHaveBeenCalledWith([AppURLS.HOME]);
    });
  });

  describe('Unauthenticated User without DefaultUser', () => {
    beforeEach(() => {
      spyOn(usersService, 'getUserIdLoggedIn').and.returnValue(Promise.resolve(undefined));
      spyOn(appPropertiesService, 'getDefaultUser').and.returnValue(Promise.resolve(undefined));
    });

    afterEach(() => {
      expect(usersService.login).not.toHaveBeenCalled();
      expect(appPropertiesService.getDefaultUser).toHaveBeenCalledTimes(1);
    });

    it('should return false when navigating home', async () => {
      expect(await guard.canActivate(HOME_ROUTE as ActivatedRouteSnapshot)).toEqual(false);
    });

    it('should return true when navigating login', async () => {
      expect(await guard.canActivate(LOGIN_ROUTE as ActivatedRouteSnapshot)).toEqual(true);
    });

    it('should redirect to the login page when navigating home', async () => {
      await guard.canActivate(HOME_ROUTE as ActivatedRouteSnapshot);

      expect(router.navigate).toHaveBeenCalledWith([AppURLS.LOGIN]);
    });

    it('should not redirect when navigating login', async () => {
      await guard.canActivate(LOGIN_ROUTE as ActivatedRouteSnapshot);

      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
