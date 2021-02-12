import { TestBed } from '@angular/core/testing';
import { DexieService } from './dexie.service';
import { Profile, ProfilesService, ProfileWithID } from './profiles.service';

describe('ProfilesService', () => {
  let service: ProfilesService;
  const MOCK_PROFILE: Profile = {
    name: 'Profile1',
  };
  const MOCK_PROFILE_2: Profile = {
    name: 'Profile2',
  };

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
    const id = await service.add(MOCK_PROFILE);
    const profile = await service.get(id);
    expect(profile?.name == MOCK_PROFILE.name).toBe(true);
  });

  it('should get undefined', async () => {
    let unexistantProfile = await service.get(4);
    expect(unexistantProfile).toBe(undefined);
  });

  it('should add one element', async () => {
    await service.add(MOCK_PROFILE);
    const profiles = await service.getAll();
    expect(profiles.length).toBe(1);
  });

  it('should not add the same element twice', async () => {
    let error;
    await service.add(MOCK_PROFILE);
    try {
      await service.add(MOCK_PROFILE);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBe(undefined);
    const profiles = await service.getAll();
    expect(profiles.length).toBe(1);
  });

  it('should update the element', async () => {
    const id = await service.add(MOCK_PROFILE);
    let profileWithId = {
      id: id,
      name: 'Profile2',
    };
    await service.update(profileWithId);
    let profileAfterUpdate = await service.get(id);
    expect(profileAfterUpdate?.name === profileWithId.name).toBe(true);
  });

  it('should not update an element with the profile name of another', async () => {
    let error;
    await service.add(MOCK_PROFILE);
    const id = await service.add(MOCK_PROFILE_2);
    let profileWithId = {
      id: id,
      name: 'Profile1',
    };
    try {
      await service.update(profileWithId);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBe(undefined);
    const profileAfterUpdate = await service.get(id);
    expect(profileAfterUpdate?.name === MOCK_PROFILE_2.name).toBe(true);
  });

  it('should not update an element that does not exists', async () => {
    const id = await service.add(MOCK_PROFILE);
    let profileWithId = {
      id: id + 1,
      name: 'Profile2',
    };
    await service.update(profileWithId);
    let profileAfterUpdate = await service.get(id);
    expect(profileAfterUpdate?.name === MOCK_PROFILE.name).toBe(true);
    let unexistantProfile = await service.get(id + 1);
    expect(unexistantProfile).toBe(undefined);
  });

  it('should delete one element', async () => {
    const id = await service.add(MOCK_PROFILE);
    await service.remove(id);
    const profiles = await service.getAll();
    expect(profiles.length).toBe(0);
  });

  it('should not delete any element if id does not exists', async () => {
    const id = await service.add(MOCK_PROFILE);
    await service.remove(id + 1);
    const profiles = await service.getAll();
    expect(profiles.length).toBe(1);
  });
});
