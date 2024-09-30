import { UserObject } from '../data';

export type User = Omit<UserObject, 'password'>;

export type UsersTableRowProps = {
  user: User;
};

export type UsersEvents = {
  [key: string]: {
    scheduleIds: string[];
    username: string;
  };
};

export type UserListProps = {
  eventId: string;
  scheduleIds: string[];
  userId: string;
  username: string;
};
