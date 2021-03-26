import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UserPropertyConstants } from 'src/app/shared/models/user-property.model';
import { DexieService } from './dexie/dexie.service';
import { UserPropertiesService } from './user-properties.service';

describe('UserPropertiesService', () => {
  const USER_ID = 1;
  const USER_ID_2 = 2;
  const CURRENCY = '€';
  const CURRENCY_2 = '$';
  const CURRENCY_MAX_LENGTH = 'x'.repeat(UserPropertyConstants.CURRENCY_MAX_LENGTH);
  const CURRENCY_ERROR_MAX_LENGTH = 'x'.repeat(UserPropertyConstants.CURRENCY_MAX_LENGTH + 1);

  let userPropertiesService: UserPropertiesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
    });

    let serviceDatabase = TestBed.inject(DexieService);
    await serviceDatabase.table('userProperties').clear();
    userPropertiesService = TestBed.inject(UserPropertiesService);
  });

  it('should return default currency', async () => {
    const currency = await userPropertiesService.getCurrency(USER_ID);

    expect(currency).toBe(UserPropertyConstants.DEFAULT_CURRENCY);
  });

  it('should set the currency for the given userId', async () => {
    await userPropertiesService.setCurrency(USER_ID, CURRENCY);
    const currency = await userPropertiesService.getCurrency(USER_ID);
    const currencyDefault = await userPropertiesService.getCurrency(USER_ID_2);

    expect(currency).toBe(CURRENCY);
    expect(currencyDefault).toBe(UserPropertyConstants.DEFAULT_CURRENCY);
  });

  it('should overwrite the currency for the given user', async () => {
    await userPropertiesService.setCurrency(USER_ID, CURRENCY);
    await userPropertiesService.setCurrency(USER_ID, CURRENCY_2);
    const currency = await userPropertiesService.getCurrency(USER_ID);

    expect(currency).toBe(CURRENCY_2);
  });

  it('should set the currency with exact ${UserPropertyConstants.CURRENCY_MAX_LENGTH} chars', async () => {
    await userPropertiesService.setCurrency(USER_ID, CURRENCY_MAX_LENGTH);
    const currency = await userPropertiesService.getCurrency(USER_ID);

    expect(currency).toBe(CURRENCY_MAX_LENGTH);
  });

  it('should not set the currency with more than ${UserPropertyConstants.CURRENCY_MAX_LENGTH} chars', async () => {
    let error;
    try {
      await userPropertiesService.setCurrency(USER_ID, CURRENCY_ERROR_MAX_LENGTH);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBe(undefined);
    const currency = await userPropertiesService.getCurrency(USER_ID);

    expect(currency).toBe(UserPropertyConstants.DEFAULT_CURRENCY);
  });

  it('should delete the currency property for the given user', async () => {
    await userPropertiesService.setCurrency(USER_ID, CURRENCY);
    await userPropertiesService.setCurrency(USER_ID_2, CURRENCY_2);
    await userPropertiesService.removeCurrency(USER_ID);
    const currencyDefault = await userPropertiesService.getCurrency(USER_ID);
    const currency = await userPropertiesService.getCurrency(USER_ID_2);

    expect(currencyDefault).toBe(UserPropertyConstants.DEFAULT_CURRENCY);
    expect(currency).toBe(CURRENCY_2);
  });
});
