import { TestBed } from '@angular/core/testing';
import { AppPropertiesService } from './app-properties.service';
import { DexieService } from './dexie/dexie.service';

describe('AppPropertiesService', () => {
  const USER_ID = 1;
  const USER_ID_2 = 2;

  let appPropertiesService: AppPropertiesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
    });

    let serviceDatabase = TestBed.inject(DexieService);
    await serviceDatabase.table('appProperties').clear();
    appPropertiesService = TestBed.inject(AppPropertiesService);
  });

  it('should return undefined when last userId logged in does not exist', async () => {
    expect(await appPropertiesService.getLastUserIdLoggedIn()).toBeUndefined();
  });

  it('should return the last userId logged in', async () => {
    await appPropertiesService.setLastUserIdLoggedIn(USER_ID);
    const userId = await appPropertiesService.getLastUserIdLoggedIn();

    expect(userId).toBe(USER_ID);
  });

  it('should return the last last userId logged in', async () => {
    await appPropertiesService.setLastUserIdLoggedIn(USER_ID);
    await appPropertiesService.setLastUserIdLoggedIn(USER_ID_2);
    const userId = await appPropertiesService.getLastUserIdLoggedIn();

    expect(userId).toBe(USER_ID_2);
  });

  it('should return undefined when last userId logged in was removed', async () => {
    await appPropertiesService.setLastUserIdLoggedIn(USER_ID);
    await appPropertiesService.removeLastUserIdLoggedIn();
    expect(await appPropertiesService.getLastUserIdLoggedIn()).toBeUndefined();
  });

  it('should let remove last userId logged in if it does not exist', async () => {
    await appPropertiesService.removeLastUserIdLoggedIn();
    expect(await appPropertiesService.getLastUserIdLoggedIn()).toBeUndefined();
  });
});
