import { Injectable } from '@angular/core';
import { UserProperty, UserPropertyConstants } from 'src/app/shared/models/user-property.model';
import { UserPropertiesService } from '../user-properties.service';
import { DexieService } from './dexie.service';

const CURRENCY = 'currency';

@Injectable()
export class UserPropertiesDexieService implements UserPropertiesService {
  private _table: Dexie.Table<UserProperty, [number, string]>;

  constructor(private dexieService: DexieService) {
    this._table = this.dexieService.table('userProperties');
  }

  async getCurrency(userId: number): Promise<string> {
    const currency = await this.getProperty(userId, CURRENCY);
    return currency || UserPropertyConstants.DEFAULT_CURRENCY;
  }

  setCurrency(userId: number, currency: string): Promise<void> {
    if (currency.length > UserPropertyConstants.CURRENCY_MAX_LENGTH) {
      throw new Error(`Currency must be at most ${UserPropertyConstants.CURRENCY_MAX_LENGTH} characters long`);
    }
    return this.setProperty(userId, CURRENCY, currency);
  }

  removeCurrency(userId: number): Promise<void> {
    return this.removeProperty(userId, CURRENCY);
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
