import { settings } from '@/modules/common';

import { UserObject, UserRole } from '../types';
import userData from '../users.json';

export const getUsersData = (): UserObject[] => {
  const { users } = userData;

  return users.map((user) => ({
    ...user,
    role: user.role as UserRole,
  }));
};

export const getUserByUsername = (username: string) => {
  const users = getUsersData();

  const result = users.find((user) => {
    if (settings.app.port === settings.app.adminPort) {
      return user.username === username && user.role === UserRole.ADMIN;
    }

    return user.username === username;
  });

  return result;
};
