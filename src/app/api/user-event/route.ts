import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { auth } from '@/modules/auth';
import redisClient from '@/modules/redis';

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { message: 'You are not authorized.' },
      { status: 401 },
    );
  }

  const session = await auth();
  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      { message: 'You are not authorized.' },
      { status: 401 },
    );
  }

  const reqData = await req.json();
  const data = await redisClient.get(reqData.userId);

  let eventIds: string[] = [];

  if (data) {
    eventIds = JSON.parse(data);
  }

  eventIds.push(reqData.eventId);

  await redisClient.set(reqData.userId, JSON.stringify(eventIds));

  await redisClient.publish(
    reqData.channel,
    JSON.stringify({ userId: reqData.userId, eventIds }),
  );

  return NextResponse.json({ message: 'User event ids updated' });
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { message: 'You are not authorized.' },
      { status: 401 },
    );
  }

  const session = await auth();
  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      { message: 'You are not authorized.' },
      { status: 401 },
    );
  }

  const reqData = await req.json();
  const data = await redisClient.get(reqData.userId);

  let eventIds: string[] = [];

  if (data) {
    eventIds = JSON.parse(data);
  }

  if (!eventIds.includes(reqData.eventId)) {
    return NextResponse.json(
      {
        message: 'Can not remove an event that does not exist',
      },
      { status: 500 },
    );
  }

  const updatedEventIds = eventIds.filter((id) => id !== reqData.eventId);

  await redisClient.set(reqData.userId, JSON.stringify(updatedEventIds));

  await redisClient.publish(
    reqData.channel,
    JSON.stringify({ userId: reqData.userId, eventIds: updatedEventIds }),
  );

  return NextResponse.json({
    message: `User event with id ${reqData.eventId} was deleted`,
  });
}
