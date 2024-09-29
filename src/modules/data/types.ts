export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserObject = {
  id: string;
  name: string;
  password: string;
  role: UserRole;
  username: string;
};
