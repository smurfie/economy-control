import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './pages/login.page';
import { LoginRoutingModule } from './login-routing.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginUserComponent } from './components/login-user/login-user.component';

@NgModule({
  declarations: [LoginPage, CreateUserComponent, LoginUserComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule],
})
export class LoginModule {}
