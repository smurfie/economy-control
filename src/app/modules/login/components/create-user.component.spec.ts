import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppPropertiesService } from 'src/app/core/services/app-properties.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UniqueUsernameValidator } from 'src/app/shared/directives/unique-username.directive';
import { AppURLS } from 'src/app/shared/models/url.model';
import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let element: HTMLInputElement;

  let router: any;
  let uniqueUsernameValidator: any;
  let usersService: UsersService;
  let appPropertiesService: AppPropertiesService;
  let input: HTMLInputElement;
  let button: HTMLButtonElement;

  function initializeComponents() {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
    input = element.querySelector('[formControlName="username"]') as HTMLInputElement;
    button = element.querySelector('button[type="submit"]') as HTMLButtonElement;
  }

  beforeEach(async () => {
    router = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateUserComponent],
      providers: [FormBuilder, { provide: Router, useValue: router }],
    }).compileComponents();
  });

  describe('Initial state', () => {
    beforeEach(async () => {
      initializeComponents();
    });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should contain username input field', () => {
      expect(element.querySelector('[formControlName="username"]')).not.toBe(null);
    });

    it('should contain submit button disabled', () => {
      const button = element.querySelector('button[type="submit"]') as HTMLButtonElement | null;

      expect(button).not.toBe(null);
      expect(button?.disabled).toBeTruthy();
    });

    it('should contain no errors', () => {
      const errors = element.querySelector('.alert') as HTMLDivElement | null;

      expect(errors).toBe(null);
    });
  });

  describe('Username input', () => {
    beforeEach(() => {
      initializeComponents();
    });

    it('should show error username too short', () => {
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const errors = element.querySelector('.alert') as HTMLDivElement | null;
      const tooShort = element.querySelector('[data-testid="too-short"]') as HTMLDivElement | null;

      expect(errors).not.toBe(null);
      expect(tooShort).not.toBe(null);
      expect(button.disabled).toBeTruthy();
    });

    it('should show error required', () => {
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const errors = element.querySelector('.alert') as HTMLDivElement | null;
      const required = element.querySelector('[data-testid="required"]') as HTMLDivElement | null;

      expect(errors).not.toBe(null);
      expect(required).not.toBe(null);
      expect(button.disabled).toBeTruthy();
    });
  });

  describe('Username input with Async Validator returning error', () => {
    beforeEach(() => {
      uniqueUsernameValidator = {
        validate: jasmine.createSpy('validate').and.returnValue(Promise.resolve({ uniqueUsername: true })),
      };
      TestBed.configureTestingModule({
        providers: [{ provide: UniqueUsernameValidator, useValue: uniqueUsernameValidator }],
      });

      initializeComponents();
    });

    it('should show error already taken', async () => {
      const username = 'Test1';

      input.value = username;
      input.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      fixture.detectChanges();

      const errors = element.querySelector('.alert') as HTMLDivElement | null;
      const alreadyTaken = element.querySelector('[data-testid="already-taken"]') as HTMLDivElement | null;

      expect(errors).not.toBe(null);
      expect(alreadyTaken).not.toBe(null);
      expect(uniqueUsernameValidator.validate).toHaveBeenCalledTimes(1);
      expect(button.disabled).toBeTruthy();
    });
  });

  describe('Username input with Async Validator returning no error', () => {
    beforeEach(() => {
      uniqueUsernameValidator = {
        validate: jasmine.createSpy('validate').and.returnValue(Promise.resolve(null)),
      };
      TestBed.configureTestingModule({
        providers: [{ provide: UniqueUsernameValidator, useValue: uniqueUsernameValidator }],
      });
      usersService = TestBed.inject(UsersService);
      appPropertiesService = TestBed.inject(AppPropertiesService);

      initializeComponents();
    });

    it('should show no errors', async () => {
      const username = 'Test1';

      input.value = username;
      input.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      fixture.detectChanges();

      const errors = element.querySelector('.alert') as HTMLDivElement | null;

      expect(errors).toBe(null);
      expect(uniqueUsernameValidator.validate).toHaveBeenCalledTimes(1);
      expect(button.disabled).toBeFalsy();
    });

    it('should login and redirect to the home', async () => {
      spyOn(usersService, 'add');
      spyOn(usersService, 'login');
      spyOn(appPropertiesService, 'setLastUserIdLoggedIn');
      const username = 'Test1';

      input.value = username;
      input.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      fixture.detectChanges();

      button.click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(usersService.add).toHaveBeenCalledWith({ username });
      expect(usersService.login).toHaveBeenCalledWith(username);
      expect(router.navigate).toHaveBeenCalledWith([AppURLS.HOME]);
    });
  });
});
