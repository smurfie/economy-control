import { TestBed } from '@angular/core/testing';
import { User, UserWithoutId } from 'src/app/shared/models/user.model';
import { AppPropertiesService } from './app-properties.service';
import { DexieService } from './dexie/dexie.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  const MOCK_USER: UserWithoutId = {
    username: 'User1',
  };
  const MOCK_USER_2: UserWithoutId = {
    username: 'User2',
  };

  let usersService: UsersService;
  let appPropertiesService: AppPropertiesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
    });

    let serviceDatabase = TestBed.inject(DexieService);
    await serviceDatabase.table('users').clear();
    await serviceDatabase.table('appProperties').clear();
    usersService = TestBed.inject(UsersService);
    appPropertiesService = TestBed.inject(AppPropertiesService);
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
  });

  it('should get empty list', async () => {
    const users = await usersService.getAll();
    expect(users.length).toBe(0);
  });

  it('should get the element by id', async () => {
    const id = await usersService.add(MOCK_USER);
    const user = await usersService.get(id);
    expect(user?.username == MOCK_USER.username).toBe(true);
  });

  it('should get undefined', async () => {
    let unexistantUser = await usersService.get(4);
    expect(unexistantUser).toBe(undefined);
  });

  it('should add one element', async () => {
    await usersService.add(MOCK_USER);
    const users = await usersService.getAll();
    expect(users.length).toBe(1);
  });

  it('should not add the same element twice', async () => {
    let error;
    await usersService.add(MOCK_USER);
    try {
      await usersService.add(MOCK_USER);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBe(undefined);
    const users = await usersService.getAll();
    expect(users.length).toBe(1);
  });

  it('should update the element', async () => {
    const id = await usersService.add(MOCK_USER);
    let user: User = {
      id: id,
      username: 'User2',
    };
    await usersService.update(user);
    let userAfterUpdate = await usersService.get(id);
    expect(userAfterUpdate?.username === user.username).toBe(true);
  });

  it('should not update an element with the username of another', async () => {
    let error;
    await usersService.add(MOCK_USER);
    const id = await usersService.add(MOCK_USER_2);
    let user: User = {
      id: id,
      username: 'User1',
    };
    try {
      await usersService.update(user);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBe(undefined);
    const userAfterUpdate = await usersService.get(id);
    expect(userAfterUpdate?.username === MOCK_USER_2.username).toBe(true);
  });

  it('should not update an element that does not exists', async () => {
    const id = await usersService.add(MOCK_USER);
    let user: User = {
      id: id + 1,
      username: 'User2',
    };
    await usersService.update(user);
    let userAfterUpdate = await usersService.get(id);
    expect(userAfterUpdate?.username === MOCK_USER.username).toBe(true);
    let unexistantUser = await usersService.get(id + 1);
    expect(unexistantUser).toBe(undefined);
  });

  it('should delete one element', async () => {
    const id = await usersService.add(MOCK_USER);
    await usersService.remove(id);
    const users = await usersService.getAll();
    expect(users.length).toBe(0);
  });

  it('should not delete any element if id does not exists', async () => {
    const id = await usersService.add(MOCK_USER);
    await usersService.remove(id + 1);
    const users = await usersService.getAll();
    expect(users.length).toBe(1);
  });

  it('should return that the user exists', async () => {
    await usersService.add(MOCK_USER);
    const exists = await usersService.exists(MOCK_USER.username);
    expect(exists).toBe(true);
  });

  it('should return that the user does not exists', async () => {
    await usersService.add(MOCK_USER);
    const exists = await usersService.exists(MOCK_USER_2.username);
    expect(exists).toBe(false);
  });

  it('should return no user logged in', async () => {
    expect(await usersService.getUserIdLoggedIn()).toBeUndefined();
  });

  describe('Login', () => {
    beforeEach(() => {
      spyOn(appPropertiesService, 'getLastUserIdLoggedIn').and.returnValue(Promise.resolve(undefined));
      spyOn(appPropertiesService, 'setLastUserIdLoggedIn');
      spyOn(appPropertiesService, 'removeLastUserIdLoggedIn');
    });

    afterEach(() => {
      expect(appPropertiesService.getLastUserIdLoggedIn).not.toHaveBeenCalled();
    });

    it('should return user logged in', async () => {
      const userId = await usersService.add(MOCK_USER);
      await usersService.login(MOCK_USER.username);

      expect(await usersService.getUserIdLoggedIn()).toBe(userId);
      expect(appPropertiesService.setLastUserIdLoggedIn).toHaveBeenCalledWith(userId);
      expect(appPropertiesService.removeLastUserIdLoggedIn).not.toHaveBeenCalled();
    });

    it('should return second user logged in', async () => {
      const userId = await usersService.add(MOCK_USER);
      const userId2 = await usersService.add(MOCK_USER_2);
      await usersService.login(MOCK_USER.username);
      await usersService.login(MOCK_USER_2.username);
      expect(await usersService.getUserIdLoggedIn()).toBe(userId2);
      expect(appPropertiesService.setLastUserIdLoggedIn).toHaveBeenCalledWith(userId);
      expect(appPropertiesService.setLastUserIdLoggedIn).toHaveBeenCalledWith(userId2);
      expect(appPropertiesService.removeLastUserIdLoggedIn).not.toHaveBeenCalled();
    });

    it('should return no user logged in after logout', async () => {
      await usersService.add(MOCK_USER);
      await usersService.login(MOCK_USER.username);
      await usersService.logout();
      expect(await usersService.getUserIdLoggedIn()).toBeUndefined();
      expect(appPropertiesService.setLastUserIdLoggedIn).toHaveBeenCalled();
      expect(appPropertiesService.removeLastUserIdLoggedIn).toHaveBeenCalled();
    });

    it('should not log in unexistant user', async () => {
      const user = await usersService.login(MOCK_USER.username);
      expect(user).toBeUndefined();
      expect(await usersService.getUserIdLoggedIn()).toBeUndefined();
      expect(appPropertiesService.setLastUserIdLoggedIn).not.toHaveBeenCalled();
      expect(appPropertiesService.removeLastUserIdLoggedIn).not.toHaveBeenCalled();
    });
  });
});
