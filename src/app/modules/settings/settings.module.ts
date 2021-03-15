import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPage } from './pages/settings.page';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [SettingsPage],
  imports: [CommonModule, SettingsRoutingModule],
})
export class SettingsModule {}
