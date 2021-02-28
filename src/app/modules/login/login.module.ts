import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './pages/login.page';
import { LoginRoutingModule } from './login-routing.module';
import { CreateUserComponent } from './components/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPage, CreateUserComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule],
})
export class LoginModule {}
