import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserPropertiesService } from 'src/app/core/services/user-properties.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UserPropertyConstants } from 'src/app/shared/models/user-property.model';
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

    it('should have retrieved the settings', () => {
      expect(usersService.getUserIdLoggedIn).toHaveBeenCalled();
      expect(userPropertiesService.getCurrency).toHaveBeenCalledWith(USER_ID);
    });

    it('should contain submit button enabled', () => {
      const button = element.querySelector('button[type="submit"]') as HTMLButtonElement | null;

      expect(button).not.toBe(null);
      expect(button?.disabled).toBeFalsy();
    });

    it('should contain no errors', () => {
      const errors = element.querySelector('.alert') as HTMLDivElement | null;

      expect(errors).toBe(null);
    });

    describe('Form', () => {
      let inputCurrency: HTMLInputElement;
      let button: HTMLButtonElement;

      beforeEach(() => {
        inputCurrency = element.querySelector('[formControlName="currency"]') as HTMLInputElement;
        button = element.querySelector('button[type="submit"]') as HTMLButtonElement;
      });

      it('should show error currency too long', () => {
        inputCurrency.value = 'x'.repeat(UserPropertyConstants.CURRENCY_MAX_LENGTH + 1);
        inputCurrency.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const errors = element.querySelector('.alert') as HTMLDivElement | null;
        const tooLong = element.querySelector('[data-testid="too-long"]') as HTMLDivElement | null;

        expect(errors).not.toBe(null);
        expect(tooLong).not.toBe(null);
        expect(button.disabled).toBeTruthy();
      });

      it('should show error currency required', () => {
        inputCurrency.value = '€';
        inputCurrency.dispatchEvent(new Event('input'));
        inputCurrency.value = '';
        inputCurrency.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const errors = element.querySelector('.alert') as HTMLDivElement | null;
        const required = element.querySelector('[data-testid="required"]') as HTMLDivElement | null;

        expect(errors).not.toBe(null);
        expect(required).not.toBe(null);
        expect(button.disabled).toBeTruthy();
      });

      it('should save the data', async () => {
        spyOn(userPropertiesService, 'setCurrency');
        const currency = '€';

        inputCurrency.value = currency;
        inputCurrency.dispatchEvent(new Event('input'));
        await fixture.whenStable();
        fixture.detectChanges();

        button.click();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(userPropertiesService.setCurrency).toHaveBeenCalledWith(USER_ID, currency);
      });
    });
  });

  // TODO Continue copying from create-user
});
