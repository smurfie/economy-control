import { Injectable } from '@angular/core';
import { Category, CategoryConstants } from 'src/app/shared/models/category.model';
import { CategoriesService } from '../categories.service';
import { DexieService } from './dexie.service';

@Injectable()
export class CategoriesDexieService implements CategoriesService {
  private _table: Dexie.Table<Category, number>;

  constructor(private dexieService: DexieService) {
    this._table = this.dexieService.table('categories');
  }

  getAll(): Promise<Array<Category>> {
    return this._table.toArray();
  }

  add(parentId: number, name: string): Promise<number> {
    if (name.length > CategoryConstants.NAME_MAX_LENGTH) {
      throw new Error(`Category name must be at most ${CategoryConstants.NAME_MAX_LENGTH} characters long`);
    }
    return this._table.add({ parentId, name } as Category);
  }
}
