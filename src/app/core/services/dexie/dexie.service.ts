import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class DexieService extends Dexie {
  constructor() {
    super('EconomyControlDatabase');
    this.version(1).stores({
      users: '++id, &username',
      appProperties: 'name, value',
    });
  }
}
