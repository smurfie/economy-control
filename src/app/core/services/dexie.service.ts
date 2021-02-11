import Dexie from 'dexie';

export class DexieService extends Dexie {
  constructor() {
    super('EconomyControlDatabase');
    this.version(1).stores({
      profiles: '++id, name',
    });
  }
}
