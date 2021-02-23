import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppURLS } from 'src/app/shared/models/url.model';
import { UsersService } from '../services/users.service';
import { LoginGuardService } from './login.guard.service';

describe('LoginGuardService', () => {
  let usersService: UsersService;
  let guard: LoginGuardService;
  let router: any;

  beforeEach(() => {
    router = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      imports: [],
      providers: [LoginGuardService, { provide: Router, useValue: router }],
    });
    usersService = TestBed.inject(UsersService);
    guard = TestBed.inject(LoginGuardService);
  });

  it('should return false for an unauthenticated user', async () => {
    spyOn(usersService, 'getUserIdLoggedIn').and.returnValue(Promise.resolve(undefined));

    expect(await guard.canActivate()).toEqual(false);
    expect(usersService.getUserIdLoggedIn).toHaveBeenCalledTimes(1);
  });

  it('should redirect to the login page for an unauthenticated user', async () => {
    spyOn(usersService, 'getUserIdLoggedIn').and.returnValue(Promise.resolve(undefined));
    await guard.canActivate();

    expect(router.navigate).toHaveBeenCalledWith([AppURLS.LOGIN]);
  });

  it('should return true for an authenticated user', async () => {
    spyOn(usersService, 'getUserIdLoggedIn').and.returnValue(Promise.resolve(1));

    expect(await guard.canActivate()).toEqual(true);
    expect(usersService.getUserIdLoggedIn).toHaveBeenCalledTimes(1);
  });

  it('should not redirect for an authenticated user', async () => {
    spyOn(usersService, 'getUserIdLoggedIn').and.returnValue(Promise.resolve(1));
    await guard.canActivate();

    expect(router.navigate).not.toHaveBeenCalled();
  });
});
