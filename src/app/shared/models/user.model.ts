export interface User {
  id: number;
  username: string;
}

export class UserConstants {
  static readonly USERNAME_MIN_LENGTH = 5;
  static readonly USERNAME_MAX_LENGTH = 20;
}
