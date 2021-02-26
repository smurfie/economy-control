import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppPropertiesService } from 'src/app/core/services/app-properties.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UniqueUsernameValidator } from 'src/app/shared/directives/unique-username.directive';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let router: any;

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
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
