import { Injectable } from '@angular/core';
import { Profile, ProfileWithID } from 'src/app/shared/models/profile.model';
import { ProfilesDexieService } from './dexie/profiles.dexie.service';

@Injectable({
  providedIn: 'root',
  useClass: ProfilesDexieService,
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
   * @param id
   */
  abstract remove(id: number): Promise<void>;

  /**
   * Return if exists a profile with the same name
   * @param name
   */
  abstract exists(name: string): Promise<boolean>;

  /**
   * Return the default profile
   */
  //abstract getDefault(): Promise<ProfileWithID>;

  /**
   * Sets the profile to be the default profile
   * @param profile
   */
  //abstract setDefault(profile: ProfileWithID): Promise<void>;
}
