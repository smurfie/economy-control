import { TestBed } from '@angular/core/testing';
import { User, UserConstants, UserWithoutId } from 'src/app/shared/models/user.model';
import { DexieService } from './dexie/dexie.service';
import { UserPropertiesService } from './user-properties.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  const MOCK_USER: UserWithoutId = {
    username: 'User1',
  };
  const MOCK_USER_2: UserWithoutId = {
    username: 'User2',
  };
  const MOCK_USER_MIN_LENGTH: UserWithoutId = {
    username: 'x'.repeat(UserConstants.USERNAME_MIN_LENGTH),
  };
  const MOCK_USER_MAX_LENGTH: UserWithoutId = {
    username: 'x'.repeat(UserConstants.USERNAME_MAX_LENGTH),
  };
  const MOCK_USER_ERROR_MIN_LENGTH: UserWithoutId = {
    username: 'x'.repeat(UserConstants.USERNAME_MIN_LENGTH - 1),
  };
  const MOCK_USER_ERROR_MAX_LENGTH: UserWithoutId = {
    username: 'x'.repeat(UserConstants.USERNAME_MAX_LENGTH + 1),
  };
  const USER_ID = 1;
  const USER_ID_2 = 2;

  let usersService: UsersService;
  let userPropertiesService: UserPropertiesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
    });

    let serviceDatabase = TestBed.inject(DexieService);
    await serviceDatabase.table('users').clear();
    window.localStorage.clear();
    usersService = TestBed.inject(UsersService);
    userPropertiesService = TestBed.inject(UserPropertiesService);
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
  });

  it('should get empty list', async () => {
    const users = await usersService.getAllLocalUsers();
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
    const users = await usersService.getAllLocalUsers();
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
    const users = await usersService.getAllLocalUsers();
    expect(users.length).toBe(1);
  });

  it('should add an username with exact ${UserConstants.USERNAME_MIN_LENGTH} chars', async () => {
    await usersService.add(MOCK_USER_MIN_LENGTH);
    const users = await usersService.getAllLocalUsers();
    expect(users.length).toBe(1);
  });

  it('should not add an username with less than ${UserConstants.USERNAME_MIN_LENGTH} chars', async () => {
    let error;
    try {
      await usersService.add(MOCK_USER_ERROR_MIN_LENGTH);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBe(undefined);
    const users = await usersService.getAllLocalUsers();
    expect(users.length).toBe(0);
  });

  it('should add an username with exact ${UserConstants.USERNAME_MAX_LENGTH} chars', async () => {
    await usersService.add(MOCK_USER_MAX_LENGTH);
    const users = await usersService.getAllLocalUsers();
    expect(users.length).toBe(1);
  });

  it('should not add an username with more than ${UserConstants.USERNAME_MAX_LENGTH} chars', async () => {
    let error;
    try {
      await usersService.add(MOCK_USER_ERROR_MAX_LENGTH);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBe(undefined);
    const users = await usersService.getAllLocalUsers();
    expect(users.length).toBe(0);
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
    const users = await usersService.getAllLocalUsers();
    expect(users.length).toBe(0);
  });

  it('should call remove on all its properties', async () => {
    spyOn(userPropertiesService, 'removeCurrency');

    const id = await usersService.add(MOCK_USER);
    await usersService.remove(id);

    expect(userPropertiesService.removeCurrency).toHaveBeenCalledWith(id);
  });

  it('should not delete any element if id does not exists', async () => {
    const id = await usersService.add(MOCK_USER);
    await usersService.remove(id + 1);
    const users = await usersService.getAllLocalUsers();
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
      spyOn(usersService, 'getLastUserIdLoggedIn').and.returnValue(undefined);
      spyOn(usersService, 'setLastUserIdLoggedIn');
      spyOn(usersService, 'removeLastUserIdLoggedIn');
    });

    afterEach(() => {
      expect(usersService.getLastUserIdLoggedIn).not.toHaveBeenCalled();
    });

    it('should return user logged in', async () => {
      const userId = await usersService.add(MOCK_USER);
      await usersService.login(MOCK_USER.username);

      expect(await usersService.getUserIdLoggedIn()).toBe(userId);
      expect(usersService.setLastUserIdLoggedIn).toHaveBeenCalledWith(userId);
      expect(usersService.removeLastUserIdLoggedIn).not.toHaveBeenCalled();
    });

    it('should return second user logged in', async () => {
      const userId = await usersService.add(MOCK_USER);
      const userId2 = await usersService.add(MOCK_USER_2);
      await usersService.login(MOCK_USER.username);
      await usersService.login(MOCK_USER_2.username);
      expect(await usersService.getUserIdLoggedIn()).toBe(userId2);
      expect(usersService.setLastUserIdLoggedIn).toHaveBeenCalledWith(userId);
      expect(usersService.setLastUserIdLoggedIn).toHaveBeenCalledWith(userId2);
      expect(usersService.removeLastUserIdLoggedIn).not.toHaveBeenCalled();
    });

    it('should return no user logged in after logout', async () => {
      await usersService.add(MOCK_USER);
      await usersService.login(MOCK_USER.username);
      usersService.logout();
      expect(await usersService.getUserIdLoggedIn()).toBeUndefined();
      expect(usersService.setLastUserIdLoggedIn).toHaveBeenCalled();
      expect(usersService.removeLastUserIdLoggedIn).toHaveBeenCalled();
    });

    it('should not log in unexistant user', async () => {
      const user = await usersService.login(MOCK_USER.username);
      expect(user).toBeUndefined();
      expect(await usersService.getUserIdLoggedIn()).toBeUndefined();
      expect(usersService.setLastUserIdLoggedIn).not.toHaveBeenCalled();
      expect(usersService.removeLastUserIdLoggedIn).not.toHaveBeenCalled();
    });
  });

  describe('LastUserLoggedIn', () => {
    it('should return undefined when last userId logged in does not exist', () => {
      expect(usersService.getLastUserIdLoggedIn()).toBeUndefined();
    });

    it('should return the last userId logged in', () => {
      usersService.setLastUserIdLoggedIn(USER_ID);
      const userId = usersService.getLastUserIdLoggedIn();

      expect(userId).toBe(USER_ID);
    });

    it('should return the last last userId logged in', () => {
      usersService.setLastUserIdLoggedIn(USER_ID);
      usersService.setLastUserIdLoggedIn(USER_ID_2);
      const userId = usersService.getLastUserIdLoggedIn();

      expect(userId).toBe(USER_ID_2);
    });

    it('should return undefined when last userId logged in was removed', () => {
      usersService.setLastUserIdLoggedIn(USER_ID);
      usersService.removeLastUserIdLoggedIn();
      expect(usersService.getLastUserIdLoggedIn()).toBeUndefined();
    });

    it('should let remove last userId logged in if it does not exist', () => {
      usersService.removeLastUserIdLoggedIn();
      expect(usersService.getLastUserIdLoggedIn()).toBeUndefined();
    });
  });
});
