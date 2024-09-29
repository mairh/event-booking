/* eslint-disable @typescript-eslint/no-unused-vars -- We're rewriting the types here so they should be included */

import NextAuth, { type DefaultSession, User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
      username: string;
    };
  }

  interface User {
    id: string;
    name: string;
    role: string;
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      name: string;
      role: string;
      username: string;
    };
  }
}
