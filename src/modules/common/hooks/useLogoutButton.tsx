'use client';

import { Session } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useTransition } from 'react';

export const useLogoutButton = () => {
  const session = useSession();
  const [isPending, startTransition] = useTransition();

  if (session.status === 'loading') {
    return {};
  }

  const {
    user: { username },
  } = session.data as Session;

  const logout = () => {
    startTransition(async () => {
      await signOut({ callbackUrl: '/login', redirect: true });
    });
  };

  const getLogoutButtonText = () => {
    if (isPending) {
      return <span className="loading loading-spinner" />;
    }

    return 'Sign Out';
  };

  return {
    username,
    logout,
    getLogoutButtonText,
  };
};
