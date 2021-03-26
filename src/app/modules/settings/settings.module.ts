import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsPage } from './pages/settings.page';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [SettingsPage, SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule, ReactiveFormsModule],
})
export class SettingsModule {}
