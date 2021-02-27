import { Injectable } from '@angular/core';
import { AppProperty } from 'src/app/shared/models/app-property.model';
import { AppPropertiesService } from '../app-properties.service';
import { DexieService } from './dexie.service';

const LAST_USER_ID_LOGGED_IN_STRING = 'lastUserIdLoggedIn';

@Injectable()
export class AppPropertiesDexieService implements AppPropertiesService {
  private _table: Dexie.Table<AppProperty>;

  constructor(private dexieService: DexieService) {
    this._table = this.dexieService.table('appProperties');
  }

  async getLastUserIdLoggedIn(): Promise<number | undefined> {
    const appProperty = await this._table.get(LAST_USER_ID_LOGGED_IN_STRING);
    return appProperty ? appProperty.value : undefined;
  }

  async setLastUserIdLoggedIn(userId: number): Promise<void> {
    let appProperty: AppProperty = {
      name: LAST_USER_ID_LOGGED_IN_STRING,
      value: userId,
    };
    await this._table.put(appProperty);
  }

  async removeLastUserIdLoggedIn(): Promise<void> {
    this._table.delete(LAST_USER_ID_LOGGED_IN_STRING);
  }
}
