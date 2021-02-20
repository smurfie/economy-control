import { Injectable } from '@angular/core';
import { User, UserWithoutId } from 'src/app/shared/models/user.model';
import { UsersService } from '../users.service';
import { DexieService } from './dexie.service';

const DEFAULT_USER_STRING = 'defaultUser';

@Injectable()
export class UsersDexieService implements UsersService {
  table: Dexie.Table<User, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('users');
  }

  getAll(): Promise<Array<User>> {
    return this.table.toArray();
  }

  get(id: number): Promise<User | undefined> {
    return this.table.get(id);
  }

  add(user: UserWithoutId): Promise<number> {
    return this.table.add(user as User);
  }

  update(user: User): Promise<number> {
    return this.table.update(user.id, user);
  }

  remove(id: number): Promise<void> {
    return this.table.delete(id);
  }

  exists(username: string): Promise<boolean> {
    return this.table.get({ username: username }, (item) => (item ? true : false));
  }
}
