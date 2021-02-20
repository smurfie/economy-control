import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppPropertiesService } from './app-properties.service';
import { DexieService } from './dexie/dexie.service';
import { UsersService } from './users.service';

describe('AppPropertiesService', () => {
  const USER_ID = 1;
  const USER_ID_2 = 2;

  let service: AppPropertiesService;
  let userService: UsersService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
    });

    let serviceDatabase = TestBed.inject(DexieService);
    await serviceDatabase.table('appProperties').clear();
    service = TestBed.inject(AppPropertiesService);
    userService = TestBed.inject(UsersService);
  });

  it('should return undefined when default user does not exist', async () => {
    expect(await service.getDefaultUser()).toBeUndefined();
  });

  it('should return the default user', async () => {
    spyOn(userService, 'get').and.returnValue(Promise.resolve({ id: USER_ID, username: '' }));
    await service.setDefaultUser(USER_ID);

    const user = await service.getDefaultUser();

    expect(userService.get).toHaveBeenCalledWith(USER_ID);
    expect(user?.id).toBe(USER_ID);
  });

  it('should return the last default user set', async () => {
    spyOn(userService, 'get').and.returnValue(Promise.resolve({ id: USER_ID_2, username: '' }));

    await service.setDefaultUser(USER_ID);
    await service.setDefaultUser(USER_ID_2);
    const user = await service.getDefaultUser();

    expect(userService.get).toHaveBeenCalledWith(USER_ID_2);
    expect(user?.id).toBe(USER_ID_2);
  });

  it('should return undefined when default user was removed', async () => {
    await service.setDefaultUser(USER_ID);
    await service.removeDefaultUser();
    expect(await service.getDefaultUser()).toBeUndefined();
  });

  it('should let remove default user if it does not exist', async () => {
    await service.removeDefaultUser();
    expect(await service.getDefaultUser()).toBeUndefined();
  });
});
