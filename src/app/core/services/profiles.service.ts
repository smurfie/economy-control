import { Injectable } from '@angular/core';
import { Profile, ProfileWithID } from 'src/app/shared/models/profile.model';

@Injectable({
  providedIn: 'root',
})
export abstract class ProfilesService {
  constructor() {}

  /**
   * Get all profiles
   */
  abstract getAll(): Promise<Array<ProfileWithID>>;

  /**
   * Get the profile with id passed as parameter or undefined if it doesn't exists
   * @param id
   */
  abstract get(id: number): Promise<ProfileWithID | undefined>;

  /**
   * Adds the profile and returns its newly created id
   * @param profile
   */
  abstract add(profile: Profile): Promise<number>;

  /**
   * Updates the profile passed as parameter, if the id don't exists do nothing
   * @param profile
   */
  abstract update(profile: ProfileWithID): Promise<number>;

  /**
   * Remove the profile with the id passed as parameter
   * @param profile
   */
  abstract remove(id: number): Promise<void>;
}
