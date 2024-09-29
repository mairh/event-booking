import { UserObject } from '../data';

export type User = Omit<UserObject, 'password'>;

export type UsersTableRowProps = {
  user: User;
};
