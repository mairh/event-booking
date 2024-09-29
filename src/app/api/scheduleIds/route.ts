import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import redisClient from '@/modules/redis';

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { message: 'You are not authorized.' },
      { status: 401 },
    );
  }

  const reqData = await req.json();

  let scheduleIds: string[] = [];

  const data = await redisClient.get(reqData.userId);

  if (data) {
    scheduleIds = JSON.parse(data);
  }

  return NextResponse.json({ scheduleIds });
}
