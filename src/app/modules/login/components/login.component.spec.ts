import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { By } from 'protractor';
import { AppPropertiesService } from 'src/app/core/services/app-properties.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UniqueUsernameValidator } from 'src/app/shared/directives/unique-username.directive';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: any;
  let input: HTMLInputElement;

  beforeEach(async () => {
    router = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: router },
        UniqueUsernameValidator,
        UsersService,
        AppPropertiesService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain username input field', () => {
    expect(fixture.nativeElement.querySelector('[formControlName="username"]')).not.toBe(null);
  });

  describe('Username input', () => {
    beforeEach(() => {
      //input = fixture.debugElement.query(By.css('[formControlName="username"]')) as HTMLInputElement;
    });

    // it('should contain username input field', () => {
    //   input.set('');
    //   expect(input.value).toBe('');
    // });
  });
});
