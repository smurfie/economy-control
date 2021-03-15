import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'ec-login-user',
  templateUrl: './login-user.component.html',
})
export class LoginUserComponent {
  @Input() user!: User;
}
