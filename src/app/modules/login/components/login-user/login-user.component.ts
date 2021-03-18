import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { AppURLS } from 'src/app/shared/models/url.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'ec-login-user',
  templateUrl: './login-user.component.html',
})
export class LoginUserComponent {
  @Input() user!: User;

  constructor(private usersService: UsersService, private router: Router) {}

  async login(): Promise<void> {
    await this.usersService.login(this.user.username);
    this.router.navigate([AppURLS.HOME]);
  }
}
