import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { CategoriesDexieService } from './dexie/categories.dexie.service';

@Injectable({
  providedIn: 'root',
  useClass: CategoriesDexieService,
})
export abstract class CategoriesService {
  /**
   * Get all root categories
   */
  abstract getRootCategories(): Promise<Array<Category>>;

  /**
   * Get all children of the given category
   */
  abstract getChildrenCategories(categoryId: number): Promise<Array<Category>>;

  /**
   * Adds the category as a subcategory of the category with id = toParentId and returns its newly created id.
   * Name length must be less than ${CategoryConstants.NAME_MAX_LENGTH}
   * @param user
   */
  abstract add(parentId: number, name: string): Promise<number>;

  /**
   * Adds the category as a root category and returns its newly created id. Name length must be less than
   * ${CategoryConstants.NAME_MAX_LENGTH}
   * @param user
   */
  abstract addToRoot(name: string): Promise<number>;

  /**
   * Move the category with 'id' as a subcategory of the category with id = toParentId
   * toParentId can't be a children of id
   */
  abstract move(id: number, toParentId: number): Promise<void>;

  /**
   * Move the category with 'id' to be a root category
   */
  abstract moveToRoot(id: number): Promise<void>;

  /**
   * Delete a category and all its subcategories only if there is no data associated to them
   */
  abstract delete(id: number): Promise<void>;
}
