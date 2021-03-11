import { TestBed } from '@angular/core/testing';
import { UserPropertiesService } from './user-properties.service';
import { DexieService } from './dexie/dexie.service';

describe('UserPropertiesService', () => {
  const USER_ID = 1;
  const USER_ID_2 = 2;
  const CURRENCY_ISO_CODE = 'USD';
  const CURRENCY_ISO_CODE_2 = 'EUR';
  let userPropertiesService: UserPropertiesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
    });

    let serviceDatabase = TestBed.inject(DexieService);
    await serviceDatabase.table('userProperties').clear();
    userPropertiesService = TestBed.inject(UserPropertiesService);
  });

  it('should return undefined currency', async () => {
    const currency = await userPropertiesService.getCurrency(USER_ID);

    expect(currency).toBeUndefined();
  });

  it('should set the currency for the given userId', async () => {
    await userPropertiesService.setCurrency(USER_ID, CURRENCY_ISO_CODE);
    const currency = await userPropertiesService.getCurrency(USER_ID);
    const currencyUndefined = await userPropertiesService.getCurrency(USER_ID_2);

    expect(currency).toBe(CURRENCY_ISO_CODE);
    expect(currencyUndefined).toBeUndefined();
  });

  it('should overwrite the currency for the given user', async () => {
    await userPropertiesService.setCurrency(USER_ID, CURRENCY_ISO_CODE);
    await userPropertiesService.setCurrency(USER_ID, CURRENCY_ISO_CODE_2);
    const currency = await userPropertiesService.getCurrency(USER_ID);

    expect(currency).toBe(CURRENCY_ISO_CODE_2);
  });

  it('should delete the currency property for the given user', async () => {
    await userPropertiesService.setCurrency(USER_ID, CURRENCY_ISO_CODE);
    await userPropertiesService.setCurrency(USER_ID_2, CURRENCY_ISO_CODE_2);
    await userPropertiesService.removeCurrency(USER_ID);
    const currencyUndefined = await userPropertiesService.getCurrency(USER_ID);
    const currency = await userPropertiesService.getCurrency(USER_ID_2);

    expect(currencyUndefined).toBeUndefined();
    expect(currency).toBe(CURRENCY_ISO_CODE_2);
  });
});
