import { User, UsersEvents } from '../types';

export type UsersTableContentProps = {
  users: User[];
};

export type EventUserTableProps = {
  eventId: string;
  usersEvents: UsersEvents;
};
