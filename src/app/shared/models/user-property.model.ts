export interface UserProperty {
  userId: number;
  propertyName: string;
  propertyValue: any;
}

export class UserPropertyConstants {
  static readonly DEFAULT_CURRENCY = '$';
  static readonly CURRENCY_MAX_LENGTH = 3;
}
