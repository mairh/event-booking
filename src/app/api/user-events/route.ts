/* eslint-disable no-param-reassign -- This is disabled to properly setup the response */

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { UsersEvents } from '@/modules/admin-panel/types';
import { getUsersData } from '@/modules/data';
import redisClient from '@/modules/redis';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { message: 'You are not authorized.' },
      { status: 401 },
    );
  }

  const users = getUsersData();

  const eventIds = await Promise.all(
    users.map((user) => redisClient.get(user.id)),
  );

  const usersEvents: UsersEvents = users.reduce((result, user, index) => {
    if (eventIds[index]) {
      const userEventIds: string[] = JSON.parse(eventIds[index]);

      result[user.id] = {
        username: user.username,
        scheduleIds: userEventIds,
      };
    } else {
      result[user.id] = {
        username: user.username,
        scheduleIds: [],
      };
    }

    return result;
  }, {} as UsersEvents);

  return NextResponse.json({ usersEvents });
}
