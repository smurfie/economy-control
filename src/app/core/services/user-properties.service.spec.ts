import { TestBed } from '@angular/core/testing';
import { UserPropertiesService } from './user-properties.service';
import { DexieService } from './dexie/dexie.service';

describe('UserPropertiesService', () => {
  let userPropertiesService: UserPropertiesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
    });

    let serviceDatabase = TestBed.inject(DexieService);
    await serviceDatabase.table('userProperties').clear();
    userPropertiesService = TestBed.inject(UserPropertiesService);
  });
});
