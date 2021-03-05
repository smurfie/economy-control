import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { AppURLS } from './shared/models/url.model';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, HeaderStubComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should contain an ec-header component in home', () => {
    const event = new NavigationEnd(0, `/${AppURLS.HOME}`, '/');
    (TestBed.inject(Router).events as any).next(event);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ec-header')).not.toBe(null);
  });

  it('should not contain an ec-header component in login', () => {
    const event = new NavigationEnd(0, `/${AppURLS.LOGIN}`, '/');
    (TestBed.inject(Router).events as any).next(event);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ec-header')).toBe(null);
  });
});

@Component({ selector: 'ec-header', template: '' })
class HeaderStubComponent implements Partial<HeaderComponent> {}
