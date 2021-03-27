export interface UserWithoutId {
  username: string;
}

export interface User extends UserWithoutId {
  id: number;
}

export class UserConstants {
  static readonly USERNAME_MIN_LENGTH = 5;
  static readonly USERNAME_MAX_LENGTH = 20;
}
