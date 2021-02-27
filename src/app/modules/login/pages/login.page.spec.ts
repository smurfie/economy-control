import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from '../components/login.component';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let page: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [LoginPage, LoginStubComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    page = fixture.componentInstance;
  });

  it('should create the page', () => {
    expect(page).toBeTruthy();
  });

  it('should contain an ec-login component', () => {
    expect(fixture.nativeElement.querySelector('ec-login')).not.toBe(null);
  });
});

@Component({ selector: 'ec-login', template: '' })
class LoginStubComponent implements Partial<LoginComponent> {}
