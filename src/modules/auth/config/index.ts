/* eslint-disable no-param-reassign -- This is disabled to align with the examples provided in the official documentation */

import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { settings } from '@/modules/common';
import { getUserByUsername } from '@/modules/data';

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: settings.jwt.maxAge,
  },
  secret: settings.jwt.secret,
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize(credentials) {
        if (credentials === undefined) {
          return null;
        }

        const user = getUserByUsername(credentials.username);

        if (!user) {
          throw new Error('Incorrect username or password.');
        }

        const { password, ...userObject } = user;

        if (password !== credentials.password) {
          throw new Error('Incorrect username or password.');
        }

        return {
          ...userObject,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }

      return Promise.resolve(session);
    },
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
