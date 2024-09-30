import { getUsersData } from '@/modules/data';

import { User } from '../types';
import { UsersTableContent } from './users-table-content';

export const UsersTable = () => {
  const users = getUsersData();

  const userList: User[] = users.map((user) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- we don't need to use password.
    const { password, ...rest } = user;

    return {
      ...rest,
    };
  });

  return <UsersTableContent users={userList} />;
};
