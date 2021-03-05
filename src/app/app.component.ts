import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppURLS } from './shared/models/url.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((event) => this.updateHeader(event));
  }

  updateHeader(location: any) {
    this.showHeader = location.url !== `/${AppURLS.LOGIN}`;
  }
}
