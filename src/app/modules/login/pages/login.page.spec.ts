import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserComponent } from '../components/create-user.component';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let page: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [LoginPage, CreateUserStubComponent],
    }).compileComponents();

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

@Component({ selector: 'ec-create-user', template: '' })
class CreateUserStubComponent implements Partial<CreateUserComponent> {}
