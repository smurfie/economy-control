import { Injectable } from '@angular/core';
import { UserPropertiesDexieService } from './dexie/user-properties.dexie.service';

@Injectable({
  providedIn: 'root',
  useClass: UserPropertiesDexieService,
})
export abstract class UserPropertiesService {
  /**
   * Get currency in ISO_4217 for userId
   */
  abstract getCurrency(userId: number): Promise<string | undefined>;

  /**
   * Set currency in ISO_4217 for userId
   */
  abstract setCurrency(userId: number, currencyISOCode: string): Promise<void>;

  /**
   * Remove currency property for userId
   */
  abstract removeCurrency(userId: number): Promise<void>;
}
