import { Injectable } from '@angular/core';
import { UserProperty } from 'src/app/shared/models/user-property.model';
import { UserPropertiesService } from '../user-properties.service';
import { DexieService } from './dexie.service';

const CURRENCY_ISO_CODE = 'currencyISOCode';

@Injectable()
export class UserPropertiesDexieService implements UserPropertiesService {
  private _table: Dexie.Table<UserProperty>;

  constructor(private dexieService: DexieService) {
    this._table = this.dexieService.table('userProperties');
  }

  getCurrency(userId: number): Promise<string | undefined> {
    return this.getProperty(userId, CURRENCY_ISO_CODE);
  }

  setCurrency(userId: number, currencyIsoCode: string): Promise<void> {
    return this.setProperty(userId, CURRENCY_ISO_CODE, currencyIsoCode);
  }

  removeCurrency(userId: number): Promise<void> {
    return this.removeProperty(userId, CURRENCY_ISO_CODE);
  }

  private async getProperty(userId: number, propertyName: string): Promise<string | undefined> {
    const property: UserProperty | undefined = await this._table.get([userId, propertyName]);
    return property?.propertyValue;
  }

  private async setProperty(userId: number, propertyName: string, propertyValue: string): Promise<void> {
    await this._table.put({ userId, propertyName, propertyValue } as UserProperty, [userId, propertyName]);
  }

  private async removeProperty(userId: number, propertyName: string): Promise<void> {
    return await this._table.delete([userId, propertyName]);
  }
}
