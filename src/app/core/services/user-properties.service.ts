import { Injectable } from '@angular/core';
import { UserPropertiesDexieService } from './dexie/user-properties.dexie.service';

@Injectable({
  providedIn: 'root',
  useClass: UserPropertiesDexieService,
})
export abstract class UserPropertiesService {
  /**
   * Get currency string or default for userId
   */
  abstract getCurrency(userId: number): Promise<string>;

  /**
   * Set currency string for userId. Currency length must be less than
   * ${UserPropertyConstants.CURRENCY_MAX_LENGTH}
   */
  abstract setCurrency(userId: number, currency: string): Promise<void>;

  /**
   * Remove currency property for userId
   */
  abstract removeCurrency(userId: number): Promise<void>;
}
