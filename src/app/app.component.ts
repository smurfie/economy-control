import { Component, OnInit } from '@angular/core';
import { ProfilesService, ProfileWithID } from './core/services/profiles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private profilesService: ProfilesService) {}
  title = 'economy-control';

  ngOnInit() {
    this.profilesService.getAll().then((profiles: Array<ProfileWithID>) => {
      console.log(profiles);
    });
  }
}
