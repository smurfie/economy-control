import { Injectable } from '@angular/core';
import { UserProperty } from 'src/app/shared/models/user-property.model';
import { UserPropertiesService } from '../user-properties.service';
import { DexieService } from './dexie.service';

@Injectable()
export class UserPropertiesDexieService implements UserPropertiesService {
  private _table: Dexie.Table<UserProperty>;

  constructor(private dexieService: DexieService) {
    this._table = this.dexieService.table('userProperties');
  }
}
