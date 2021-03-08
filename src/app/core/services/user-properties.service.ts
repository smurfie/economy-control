import { Injectable } from '@angular/core';
import { UserPropertiesDexieService } from './dexie/user-properties.dexie.service';

@Injectable({
  providedIn: 'root',
  useClass: UserPropertiesDexieService,
})
export abstract class UserPropertiesService {}
