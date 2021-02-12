import { Component, OnInit } from '@angular/core';
import { ProfilesService } from './core/services/profiles.service';
import { ProfileWithID } from './shared/models/profile.model';

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
