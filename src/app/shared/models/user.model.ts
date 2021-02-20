export interface UserWithoutId {
  username: string;
}

export interface User extends UserWithoutId {
  id: number;
}
