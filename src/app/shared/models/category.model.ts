export interface Category {
  id: number;
  parentId: number;
  name: string;
}

export class CategoryConstants {
  static readonly ROOT_ID = 0;
  static readonly NAME_MAX_LENGTH = 30;
}
