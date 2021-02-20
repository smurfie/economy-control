import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AppProperty } from 'src/app/shared/models/app-property.model';
import { AppPropertiesService } from '../app-properties.service';
import { DexieService } from './dexie.service';
import { UsersService } from '../users.service';

const DEFAULT_USER_STRING = 'defaultUser';

@Injectable()
export class AppPropertiesDexieService implements AppPropertiesService {
  table: Dexie.Table<AppProperty>;

  constructor(private dexieService: DexieService, private userService: UsersService) {
    this.table = this.dexieService.table('appProperties');
  }

  async getDefaultUser(): Promise<User | undefined> {
    const appProperty = await this.table.get(DEFAULT_USER_STRING);
    return appProperty ? await this.userService.get(appProperty.value) : undefined;
  }

  async setDefaultUser(userId: number): Promise<void> {
    let appProperty: AppProperty = {
      name: DEFAULT_USER_STRING,
      value: userId,
    };
    await this.table.put(appProperty);
  }

  async removeDefaultUser(): Promise<void> {
    this.table.delete(DEFAULT_USER_STRING);
  }
}
