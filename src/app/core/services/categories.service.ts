import { Injectable } from '@angular/core';
import { CategoriesDexieService } from './dexie/categories.dexie.service';

@Injectable({
  providedIn: 'root',
  useClass: CategoriesDexieService,
})
export abstract class CategoriesService {
  /**
   * Adds the category with its parentId and returns its newly created id. Name length must be less than
   * ${CategoryConstants.NAME_MAX_LENGTH}
   * @param user
   */
  abstract add(parentId: number, name: string): Promise<number>;
}
