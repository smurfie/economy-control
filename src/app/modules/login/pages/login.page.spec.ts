import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { CreateUserComponent } from '../components/create-user/create-user.component';
import { LoginUserComponent } from '../components/login-user/login-user.component';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let page: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [LoginPage, CreateUserStubComponent, LoginUserStubComponent],
    }).compileComponents();
    usersService = TestBed.inject(UsersService);

    fixture = TestBed.createComponent(LoginPage);
    page = fixture.componentInstance;
  });

  describe('Non depending services tests', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginPage);
      page = fixture.componentInstance;
    });

    it('should create the page', () => {
      expect(page).toBeTruthy();
    });

    it('should contain an ec-create-user component', () => {
      expect(fixture.nativeElement.querySelector('ec-create-user')).not.toBe(null);
    });
  });

  describe('Depending services tests', () => {
    it('should contain no ec-login-user components', () => {
      spyOn(usersService, 'getAll').and.returnValue(Promise.resolve([]));
      fixture = TestBed.createComponent(LoginPage);
      page = fixture.componentInstance;

      expect(fixture.nativeElement.querySelector('ec-login-user')).toBeNull();
      expect(usersService.getAll).toHaveBeenCalled();
    });

    it('should contain ec-login-user components as users', async () => {
      const users: User[] = [
        { id: 1, username: 'User1' },
        { id: 2, username: 'User2' },
        { id: 3, username: 'User3' },
      ];
      spyOn(usersService, 'getAll').and.returnValue(Promise.resolve(users));
      fixture = TestBed.createComponent(LoginPage);
      page = fixture.componentInstance;
      await fixture.whenStable();
      fixture.detectChanges();

      expect((fixture.nativeElement.querySelectorAll('ec-login-user') as any[]).length).toBe(3);
      expect(usersService.getAll).toHaveBeenCalled();
    });
  });
});

@Component({ selector: 'ec-create-user', template: '' })
class CreateUserStubComponent implements Partial<CreateUserComponent> {}

@Component({ selector: 'ec-login-user', template: '' })
class LoginUserStubComponent implements Partial<LoginUserComponent> {
  @Input() user!: User;
}
