import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AppPropertiesDexieService } from './dexie/app-properties.dexie.service';

@Injectable({
  providedIn: 'root',
  useClass: AppPropertiesDexieService,
})
export abstract class AppPropertiesService {
  constructor() {}

  /**
   * Return the last user id that was logged in (and not logged out). Useful to keep the user logged between sessions.
   */
  abstract getLastUserIdLoggedIn(): Promise<number | undefined>;

  /**
   * Sets the last user id that was logged in
   * @param userId
   */
  abstract setLastUserIdLoggedIn(userId: number): Promise<void>;

  /**
   * Remove (logout) last user id that was logged in
   */
  abstract removeLastUserIdLoggedIn(): Promise<void>;
}
