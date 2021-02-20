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
   * Return the default user
   */
  abstract getDefaultUser(): Promise<User | undefined>;

  /**
   * Sets the user with userId passed as parameter to be the default user
   * @param userId
   */
  abstract setDefaultUser(userId: number): Promise<void>;

  /**
   * Remove the default user from the app
   */
  abstract removeDefaultUser(): Promise<void>;
}
