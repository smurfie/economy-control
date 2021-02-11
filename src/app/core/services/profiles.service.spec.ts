import { TestBed } from '@angular/core/testing';
import { DexieService } from './dexie.service';
import { Profile, ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
  let service: ProfilesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [ProfilesService, DexieService],
    });

    let serviceDatabase = TestBed.inject(DexieService);
    await serviceDatabase.table('profiles').clear();
    service = TestBed.inject(ProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get empty list', async () => {
    const profiles = await service.getAll();

    expect(profiles.length).toBe(0);
  });

  it('should get the element by id', async () => {
    const profile: Profile = {
      name: 'Profile1',
    };
    const id = await service.add(profile);
    const profileAfterGet = await service.get(id);

    expect(profileAfterGet?.name == profile.name).toBe(true);
  });

  it('should get undefined', async () => {
    let unexistantProfile = await service.get(4);

    expect(unexistantProfile).toBe(undefined);
  });

  it('should add one element', async () => {
    const profile: Profile = {
      name: 'Profile1',
    };
    await service.add(profile);
    const profiles = await service.getAll();

    expect(profiles.length).toBe(1);
  });

  it('should update the element', async () => {
    const profile: Profile = {
      name: 'Profile1',
    };
    const id = await service.add(profile);
    let profileAfterGet = await service.get(id);

    expect(profileAfterGet).not.toBe(undefined);

    if (profileAfterGet) {
      profileAfterGet.name = 'Profile2';
      await service.update(profileAfterGet);
      let profileAfterUpdate = await service.get(id);

      expect(profileAfterUpdate?.name === profileAfterGet.name).toBe(true);
    }
  });

  it('should not update an element that does not exists', async () => {
    const profile: Profile = {
      name: 'Profile1',
    };
    const id = await service.add(profile);
    let profileAfterGet = await service.get(id);

    expect(profileAfterGet).not.toBe(undefined);

    if (profileAfterGet) {
      profileAfterGet.id++;
      profileAfterGet.name = 'Profile2';
      await service.update(profileAfterGet);
      let profileBeforeUpdate = await service.get(id);

      expect(profileBeforeUpdate?.name === profile.name).toBe(true);

      let profileAfterUpdate = await service.get(id + 1);

      expect(profileAfterUpdate).toBe(undefined);
    }
  });

  it('should delete one element', async () => {
    const profile: Profile = {
      name: 'Profile1',
    };
    const id = await service.add(profile);
    await service.remove(id);
    const profiles = await service.getAll();

    expect(profiles.length).toBe(0);
  });

  it('should not delete any element if id does not exists', async () => {
    const profile: Profile = {
      name: 'Profile1',
    };
    const id = await service.add(profile);
    await service.remove(id + 1);
    const profiles = await service.getAll();

    expect(profiles.length).toBe(1);
  });
});
