import { Component } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'ec-login-page',
  templateUrl: './login.page.html',
})
export class LoginPage {
  users: User[] = [];

  constructor(private usersService: UsersService) {
    this.usersService.getAllLocalUsers().then((allLocalUsers) => {
      this.users = allLocalUsers;
    });
  }
}
