import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppPropertiesService } from 'src/app/core/services/app-properties.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UniqueUsernameValidator } from 'src/app/shared/directives/unique-username.directive';
import { AppURLS } from 'src/app/shared/models/url.model';
import { UserWithoutId } from 'src/app/shared/models/user.model';

@Component({
  selector: 'ec-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  createUserForm = this.formBuilder.group({
    username: [
      '',
      [Validators.required, Validators.minLength(5)],
      this.uniqueUsernameValidator.validate.bind(this.uniqueUsernameValidator),
    ],
  });

  get username() {
    return this.createUserForm.get('username');
  }

  constructor(
    private formBuilder: FormBuilder,
    private uniqueUsernameValidator: UniqueUsernameValidator,
    private usersService: UsersService,
    private appPropertiesService: AppPropertiesService,
    private router: Router
  ) {}

  async createAndLogin() {
    const user: UserWithoutId = {
      username: this.username?.value,
    };
    const userId = await this.usersService.add(user);
    await this.usersService.login(user.username);
    await this.appPropertiesService.setDefaultUser(userId);

    this.router.navigate([AppURLS.HOME]);
  }
}
