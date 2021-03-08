import { Injectable } from '@angular/core';
import { User, UserWithoutId } from 'src/app/shared/models/user.model';
import { UsersDexieService } from './dexie/users.dexie.service';

@Injectable({
  providedIn: 'root',
  useClass: UsersDexieService,
})
export abstract class UsersService {
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

  /**
   * Login an user by username and save it to the lastUserIdLoggedIn
   * @param username
   */
  abstract login(username: string): Promise<User | undefined>;

  /**
   * Logout current logged in user and remove it from the lastUserIdLoggedIn
   */
  abstract logout(): void;

  /**
   * Return current logged in userId
   */
  abstract getUserIdLoggedIn(): Promise<number | undefined>;

  /**
   * Return the last user id that was logged in (and not logged out). Useful to keep the user logged between sessions.
   */
  abstract getLastUserIdLoggedIn(): number | undefined;

  /**
   * Sets the last user id that was logged in
   * @param userId
   */
  abstract setLastUserIdLoggedIn(userId: number): void;

  /**
   * Remove (logout) last user id that was logged in
   */
  abstract removeLastUserIdLoggedIn(): void;
}
