import { Injectable } from '@angular/core';
import { User, UserWithoutId } from 'src/app/shared/models/user.model';
import { UserPropertiesService } from '../user-properties.service';
import { UsersService } from '../users.service';
import { DexieService } from './dexie.service';

const LAST_USER_ID_LOGGED_IN_STRING = 'lastUserIdLoggedIn';

@Injectable()
export class UsersDexieService implements UsersService {
  private _table: Dexie.Table<User, number>;
  private _userIdLoggedIn: number | undefined;

  constructor(private dexieService: DexieService, private userPropertiesService: UserPropertiesService) {
    this._table = this.dexieService.table('users');
  }

  getAll(): Promise<Array<User>> {
    return this._table.toArray();
  }

  get(id: number): Promise<User | undefined> {
    return this._table.get(id);
  }

  add(user: UserWithoutId): Promise<number> {
    return this._table.add(user as User);
  }

  update(user: User): Promise<number> {
    return this._table.update(user.id, user);
  }

  async remove(id: number): Promise<void> {
    await this.userPropertiesService.removeCurrency(id);
    await this._table.delete(id);
  }

  exists(username: string): Promise<boolean> {
    return this._table.get({ username: username }, (item) => (item ? true : false));
  }

  async login(username: string): Promise<User | undefined> {
    const userWithourId: UserWithoutId = { username: username };
    const user = await this._table.get(userWithourId);
    if (user) {
      this._userIdLoggedIn = user.id;
      this.setLastUserIdLoggedIn(user.id);
    }
    return user;
  }

  logout(): void {
    this._userIdLoggedIn = undefined;
    this.removeLastUserIdLoggedIn();
  }

  async getUserIdLoggedIn(): Promise<number | undefined> {
    return this._userIdLoggedIn;
  }

  getLastUserIdLoggedIn(): number | undefined {
    const lastUserIdLoggedInString = localStorage.getItem(LAST_USER_ID_LOGGED_IN_STRING);
    const lastUserIdLoggedIn = Number(lastUserIdLoggedInString);
    return Number.isInteger(lastUserIdLoggedIn) && lastUserIdLoggedIn > 0 ? lastUserIdLoggedIn : undefined;
  }

  setLastUserIdLoggedIn(userId: number): void {
    localStorage.setItem(LAST_USER_ID_LOGGED_IN_STRING, String(userId));
  }

  removeLastUserIdLoggedIn(): void {
    localStorage.removeItem(LAST_USER_ID_LOGGED_IN_STRING);
  }
}
