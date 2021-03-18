import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { AppURLS } from 'src/app/shared/models/url.model';
import { User } from 'src/app/shared/models/user.model';
import { RouterLinkDirectiveStub } from 'src/testing/router-link-directive-stub';
import { LoginUserComponent } from './login-user.component';

describe('LoginUserComponent', () => {
  const USER: User = {
    id: 1,
    username: 'User1',
  };

  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;
  let element: HTMLElement;

  let router: any;
  let usersService: UsersService;
  let link: HTMLLinkElement | null;

  beforeEach(async () => {
    router = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      declarations: [LoginUserComponent, RouterLinkDirectiveStub],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();
    usersService = TestBed.inject(UsersService);

    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.user = USER;
    fixture.detectChanges();
    link = element.querySelector('.stretched-link');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the username', () => {
    expect(element.innerHTML).toContain(USER.username);
  });

  it('should login the user', async () => {
    spyOn(usersService, 'login');

    link?.click();
    await fixture.whenStable();

    expect(usersService.login).toHaveBeenCalledWith(USER.username);
    expect(router.navigate).toHaveBeenCalledWith([AppURLS.HOME]);
  });
});
