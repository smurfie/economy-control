import { Injectable } from '@angular/core';
import { User, UserWithoutId } from 'src/app/shared/models/user.model';
import { UsersDexieService } from './dexie/users.dexie.service';

@Injectable({
  providedIn: 'root',
  useClass: UsersDexieService,
})
export abstract class UsersService {
  constructor() {}

  /**
   * Get all users
   */
  abstract getAll(): Promise<Array<User>>;

  /**
   * Get the user with id passed as parameter or undefined if it doesn't exists
   * @param id
   */
  abstract get(id: number): Promise<User | undefined>;

  /**
   * Adds the user and returns its newly created id
   * @param user
   */
  abstract add(user: UserWithoutId): Promise<number>;

  /**
   * Updates the user passed as parameter, if the id don't exists do nothing
   * @param user
   */
  abstract update(user: User): Promise<number>;

  /**
   * Remove the user with the id passed as parameter
   * @param id
   */
  abstract remove(id: number): Promise<void>;

  /**
   * Return if exists a user with the same username
   * @param username
   */
  abstract exists(username: string): Promise<boolean>;
}
