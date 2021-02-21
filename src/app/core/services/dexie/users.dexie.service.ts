import { Injectable } from '@angular/core';
import { User, UserWithoutId } from 'src/app/shared/models/user.model';
import { UsersService } from '../users.service';
import { DexieService } from './dexie.service';

const DEFAULT_USER_STRING = 'defaultUser';

@Injectable()
export class UsersDexieService implements UsersService {
  private _table: Dexie.Table<User, number>;
  private _userIdLoggedIn: number | undefined;

  constructor(private dexieService: DexieService) {
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

  remove(id: number): Promise<void> {
    return this._table.delete(id);
  }

  exists(username: string): Promise<boolean> {
    return this._table.get({ username: username }, (item) => (item ? true : false));
  }

  login(username: string): Promise<User | undefined> {
    return this._table.get({ username: username }, (item) => {
      this._userIdLoggedIn = item ? item.id : undefined;
      return item;
    });
  }

  async logout(): Promise<void> {
    this._userIdLoggedIn = undefined;
  }

  async getUserIdLoggedIn(): Promise<number | undefined> {
    return this._userIdLoggedIn;
  }
}
