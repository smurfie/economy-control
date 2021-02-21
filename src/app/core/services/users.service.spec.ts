import { TestBed } from '@angular/core/testing';
import { User, UserWithoutId } from 'src/app/shared/models/user.model';
import { DexieService } from './dexie/dexie.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  const MOCK_USER: UserWithoutId = {
    username: 'User1',
  };
  const MOCK_USER_2: UserWithoutId = {
    username: 'User2',
  };

  let service: UsersService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
    });

    let serviceDatabase = TestBed.inject(DexieService);
    await serviceDatabase.table('users').clear();
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get empty list', async () => {
    const users = await service.getAll();
    expect(users.length).toBe(0);
  });

  it('should get the element by id', async () => {
    const id = await service.add(MOCK_USER);
    const user = await service.get(id);
    expect(user?.username == MOCK_USER.username).toBe(true);
  });

  it('should get undefined', async () => {
    let unexistantUser = await service.get(4);
    expect(unexistantUser).toBe(undefined);
  });

  it('should add one element', async () => {
    await service.add(MOCK_USER);
    const users = await service.getAll();
    expect(users.length).toBe(1);
  });

  it('should not add the same element twice', async () => {
    let error;
    await service.add(MOCK_USER);
    try {
      await service.add(MOCK_USER);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBe(undefined);
    const users = await service.getAll();
    expect(users.length).toBe(1);
  });

  it('should update the element', async () => {
    const id = await service.add(MOCK_USER);
    let user: User = {
      id: id,
      username: 'User2',
    };
    await service.update(user);
    let userAfterUpdate = await service.get(id);
    expect(userAfterUpdate?.username === user.username).toBe(true);
  });

  it('should not update an element with the username of another', async () => {
    let error;
    await service.add(MOCK_USER);
    const id = await service.add(MOCK_USER_2);
    let user: User = {
      id: id,
      username: 'User1',
    };
    try {
      await service.update(user);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBe(undefined);
    const userAfterUpdate = await service.get(id);
    expect(userAfterUpdate?.username === MOCK_USER_2.username).toBe(true);
  });

  it('should not update an element that does not exists', async () => {
    const id = await service.add(MOCK_USER);
    let user: User = {
      id: id + 1,
      username: 'User2',
    };
    await service.update(user);
    let userAfterUpdate = await service.get(id);
    expect(userAfterUpdate?.username === MOCK_USER.username).toBe(true);
    let unexistantUser = await service.get(id + 1);
    expect(unexistantUser).toBe(undefined);
  });

  it('should delete one element', async () => {
    const id = await service.add(MOCK_USER);
    await service.remove(id);
    const users = await service.getAll();
    expect(users.length).toBe(0);
  });

  it('should not delete any element if id does not exists', async () => {
    const id = await service.add(MOCK_USER);
    await service.remove(id + 1);
    const users = await service.getAll();
    expect(users.length).toBe(1);
  });

  it('should return that the user exists', async () => {
    await service.add(MOCK_USER);
    const exists = await service.exists(MOCK_USER.username);
    expect(exists).toBe(true);
  });

  it('should return that the user does not exists', async () => {
    await service.add(MOCK_USER);
    const exists = await service.exists(MOCK_USER_2.username);
    expect(exists).toBe(false);
  });

  it('should return no user logged in', async () => {
    expect(await service.getUserIdLoggedIn()).toBeUndefined();
  });

  it('should return user logged in', async () => {
    const userId = await service.add(MOCK_USER);
    await service.login(MOCK_USER.username);
    expect(await service.getUserIdLoggedIn()).toBe(userId);
  });

  it('should return second user logged in', async () => {
    await service.add(MOCK_USER);
    const userId = await service.add(MOCK_USER_2);
    await service.login(MOCK_USER.username);
    await service.login(MOCK_USER_2.username);
    expect(await service.getUserIdLoggedIn()).toBe(userId);
  });

  it('should return no user logged in after logout', async () => {
    await service.add(MOCK_USER);
    await service.login(MOCK_USER.username);
    await service.logout();
    expect(await service.getUserIdLoggedIn()).toBeUndefined();
  });

  it('should not log in unexistant user', async () => {
    const user = await service.login(MOCK_USER.username);
    expect(user).toBeUndefined();
    expect(await service.getUserIdLoggedIn()).toBeUndefined();
  });
});
