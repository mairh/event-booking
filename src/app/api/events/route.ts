import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { client } from '@/sanity/lib/client';
import { eventsQuery } from '@/sanity/lib/queries';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { message: 'You are not authorized.' },
      { status: 401 },
    );
  }

  const data = await client.fetch(eventsQuery);

  return NextResponse.json({ events: data });
}
