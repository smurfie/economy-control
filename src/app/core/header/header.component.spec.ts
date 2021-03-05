import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppURLS } from 'src/app/shared/models/url.model';
import { UsersService } from '../services/users.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;

  let router: any;
  let usersService: UsersService;
  let button: HTMLButtonElement | null;

  beforeEach(async () => {
    router = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();
    usersService = TestBed.inject(UsersService);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Logout Button', () => {
    beforeEach(() => {
      button = element.querySelector('button') as HTMLButtonElement | null;
    });

    it('should contain a logout button', () => {
      expect(button).not.toBe(null);
    });

    it('should logout and redirect to login', async () => {
      spyOn(usersService, 'logout');

      button?.click();
      await fixture.whenStable();

      expect(usersService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([AppURLS.LOGIN]);
    });
  });
});
