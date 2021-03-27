import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SettingsComponent } from '../components/settings/settings.component';
import { SettingsPage } from './settings.page';

describe('SettingsPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [SettingsPage, SettingsStubComponent],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(SettingsPage);
    const page = fixture.componentInstance;
    expect(page).toBeTruthy();
  });
});

@Component({ selector: 'ec-settings', template: '' })
class SettingsStubComponent implements Partial<SettingsComponent> {}
