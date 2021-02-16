import { Injectable } from '@angular/core';
import { Profile, ProfileWithID } from 'src/app/shared/models/profile.model';
import { ProfilesService } from '../profiles.service';
import { DexieService } from './dexie.service';

const DEFAULT_PROFILE_STRING = 'defaultProfile';

@Injectable()
export class ProfilesDexieService implements ProfilesService {
  table: Dexie.Table<ProfileWithID, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('profiles');
  }

  getAll(): Promise<Array<ProfileWithID>> {
    return this.table.toArray();
  }

  get(id: number): Promise<ProfileWithID | undefined> {
    return this.table.get(id);
  }

  add(profile: Profile): Promise<number> {
    return this.table.add(profile as ProfileWithID);
  }

  update(profile: ProfileWithID): Promise<number> {
    return this.table.update(profile.id, profile);
  }

  remove(id: number): Promise<void> {
    return this.table.delete(id);
  }

  exists(name: string): Promise<boolean> {
    return this.table.get({ name: name }, (item) => (item ? true : false));
  }

  getDefault(): Promise<ProfileWithID | undefined> {
    const profileId = localStorage.getItem(DEFAULT_PROFILE_STRING);
    let promise;

    if (profileId) {
      promise = this.get(parseInt(profileId));
    } else {
      promise = Promise.resolve(undefined);
    }
    return promise;
  }

  setDefault(id: number): Promise<void> {
    localStorage.setItem(DEFAULT_PROFILE_STRING, String(id));
    return Promise.resolve();
  }
}
