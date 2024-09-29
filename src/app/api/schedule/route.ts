import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { client } from '@/sanity/lib/client';
import { scheduleQuery } from '@/sanity/lib/queries';

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { message: 'You are not authorized.' },
      { status: 401 },
    );
  }

  const eventIds = await req.json();

  const schedule = await client.fetch(scheduleQuery, {
    eventIds,
  });

  return NextResponse.json({ schedule });
}
