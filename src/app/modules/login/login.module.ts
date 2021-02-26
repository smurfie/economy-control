import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './pages/login.page';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPage, LoginComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule],
})
export class LoginModule {}
