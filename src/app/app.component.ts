import { Component, OnInit } from '@angular/core';
import { UsersService } from './core/services/users.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private usersService: UsersService) {}
  title = 'economy-control';

  ngOnInit() {
    this.usersService.getAll().then((users: Array<User>) => {
      console.log(users);
    });
  }
}
