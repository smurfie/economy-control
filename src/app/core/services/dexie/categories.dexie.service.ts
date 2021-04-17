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

  getRootCategories(): Promise<Array<Category>> {
    return this.getChildrenCategories(CategoryConstants.ROOT_ID);
  }

  getChildrenCategories(categoryId: number): Promise<Array<Category>> {
    return this._table.where({ parentId: categoryId }).toArray();
  }

  add(parentId: number, name: string): Promise<number> {
    if (name.length > CategoryConstants.NAME_MAX_LENGTH) {
      throw new Error(`Category name must be at most ${CategoryConstants.NAME_MAX_LENGTH} characters long`);
    }
    return this._table.add({ parentId, name } as Category);
  }

  addToRoot(name: string): Promise<number> {
    return this.add(CategoryConstants.ROOT_ID, name);
  }

  async move(id: number, toParentId: number): Promise<void> {
    let category = await this._table.get(id);

    // Check that parentId exists and is not a children of id or itself
    let destinationCategory = await this._table.get(toParentId);
    if (id === toParentId || (await this.isAncestor(category!, destinationCategory!))) {
      throw new Error(`Destination parent category can't be neither a children of the moved category nor itself`);
    }

    category!.parentId = toParentId;
    this._table.put(category!);
  }

  private async isAncestor(possibleAncestorCategory: Category, category: Category): Promise<boolean> {
    if (category.parentId === CategoryConstants.ROOT_ID) {
      return false;
    }
    const parentCategory = await this._table.get(category.parentId);
    if (parentCategory!.id === possibleAncestorCategory.id) {
      return true;
    }
    return this.isAncestor(possibleAncestorCategory, parentCategory!);
  }

  moveToRoot(id: number): Promise<void> {
    return this.move(id, CategoryConstants.ROOT_ID);
  }

  async delete(id: number): Promise<void> {
    const childrenCategories = await this.childrenCategories();
    let categoriesToDelete: number[] = [];
    let categoriesToSearch = [id];
    while (categoriesToSearch.length > 0) {
      const categoryId = categoriesToSearch.pop();
      categoriesToDelete.push(categoryId!);
      categoriesToSearch.push(...childrenCategories.get(categoryId!)!);
    }
    await this._table.bulkDelete(categoriesToDelete);
  }

  private async childrenCategories(): Promise<Map<number, [number]>> {
    let childrenCategories: Map<number, [number]> = new Map<number, [number]>();
    const allCategories = await this._table.toArray();
    for (const category of allCategories) {
      let children = childrenCategories.get(category.parentId);
      if (!children) {
        children = [category.id];
        childrenCategories.set(category.parentId, children);
      } else {
        children.push(category.id);
      }
    }
    return childrenCategories;
  }
}
