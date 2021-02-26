import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoginComponent } from '../components/login.component';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [LoginPage, LoginStubComponent],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const page = fixture.componentInstance;
    expect(page).toBeTruthy();
  });
});

@Component({ selector: 'ec-login', template: '' })
class LoginStubComponent implements Partial<LoginComponent> {}
