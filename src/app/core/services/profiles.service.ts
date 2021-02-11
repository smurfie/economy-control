import { Injectable } from '@angular/core';
import { DexieService } from './dexie.service';

export interface Profile {
  name: string;
}

export interface ProfileWithID extends Profile {
  id: number;
}

@Injectable()
export class ProfilesService {
  table: Dexie.Table<ProfileWithID, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('profiles');
  }

  /**
   * Get all profiles
   */
  getAll(): Promise<Array<ProfileWithID>> {
    return this.table.toArray();
  }

  /**
   * Get the profile with id passed as parameter or undefined if it doesn't exists
   * @param id
   */
  get(id: number): Promise<ProfileWithID | undefined> {
    return this.table.get(id);
  }

  /**
   * Adds the profile and returns its newly created id
   * @param profile
   */
  add(profile: Profile): Promise<number> {
    return this.table.add(profile as ProfileWithID);
  }

  /**
   * Updates the profile passed as parameter, if the id don't exists do nothing
   * @param profile
   */
  update(profile: ProfileWithID): Promise<number> {
    return this.table.update(profile.id, profile);
  }

  /**
   * Remove the profile with the id passed as parameter
   * @param profile
   */
  remove(id: number): Promise<void> {
    return this.table.delete(id);
  }
}
