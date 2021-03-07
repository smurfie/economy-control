import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppURLS } from 'src/app/shared/models/url.model';
import { RouterLinkDirectiveStub } from 'src/testing/router-link-directive-stub';
import { UsersService } from '../services/users.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;

  let router: any;
  let usersService: UsersService;
  let link: HTMLLinkElement | null;

  beforeEach(async () => {
    router = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, RouterLinkDirectiveStub],
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

  describe('Links', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should contain home link', () => {
      let homeLinkDebug = fixture.debugElement.query(By.css('[data-testid="home"]'));
      let homeLinkDirective = homeLinkDebug.injector.get(RouterLinkDirectiveStub);
      expect(homeLinkDirective.linkParams).toBe(AppURLS.HOME);
    });
  });

  describe('Logout Link', () => {
    beforeEach(() => {
      link = element.querySelector('[data-testid="logout"]') as HTMLLinkElement | null;
    });

    it('should contain a logout link', () => {
      expect(link).not.toBe(null);
    });

    it('should logout and redirect to login', async () => {
      spyOn(usersService, 'logout');

      link?.click();
      await fixture.whenStable();

      expect(usersService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([AppURLS.LOGIN]);
    });
  });
});
