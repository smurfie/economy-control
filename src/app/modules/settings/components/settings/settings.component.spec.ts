import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserPropertiesService } from 'src/app/core/services/user-properties.service';
import { UsersService } from 'src/app/core/services/users.service';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  const USER_ID = 1;
  const CURRENCY = '$';

  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let element: HTMLElement;

  let usersService: UsersService;
  let userPropertiesService: UserPropertiesService;

  let currencyInput: HTMLInputElement;
  let button: HTMLButtonElement;

  function initializeComponents() {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
    currencyInput = element.querySelector('[formControlName="currency"]') as HTMLInputElement;
    button = element.querySelector('button[type="submit"]') as HTMLButtonElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SettingsComponent],
      providers: [FormBuilder],
    }).compileComponents();

    usersService = TestBed.inject(UsersService);
    userPropertiesService = TestBed.inject(UserPropertiesService);
    spyOn(usersService, 'getUserIdLoggedIn').and.returnValue(Promise.resolve(USER_ID));
    spyOn(userPropertiesService, 'getCurrency').and.returnValue(Promise.resolve(CURRENCY));
    initializeComponents();
  });

  describe('Initial state', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should show loading spinner', () => {
      expect(element.querySelector('[data-testid="loading"]')).not.toBe(null);
    });

    it('should not show form', () => {
      expect(element.querySelector('form')).toBe(null);
    });
  });

  describe('Data loaded', () => {
    beforeEach(async () => {
      await fixture.whenStable();
      fixture.detectChanges();
    });

    it('should not show loading spinner', () => {
      expect(element.querySelector('[data-testid="loading"]')).toBe(null);
    });

    it('should show form', () => {
      expect(element.querySelector('form')).not.toBe(null);
    });

    xit('should contain submit button disabled', () => {
      const button = element.querySelector('button[type="submit"]') as HTMLButtonElement | null;

      expect(button).not.toBe(null);
      expect(button?.disabled).toBeTruthy();
    });

    xit('should contain no errors', () => {
      const errors = element.querySelector('.alert') as HTMLDivElement | null;

      expect(errors).toBe(null);
    });
  });

  // TODO Continue copying from create-user
  // TODO Check which test is failing sometimes
});
