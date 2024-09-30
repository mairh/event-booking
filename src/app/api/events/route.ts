import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import redisClient from '@/modules/redis';
import { client } from '@/sanity/lib/client';
import { eventsQuery } from '@/sanity/lib/queries';
import { seed } from '@/sanity/scripts';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { message: 'You are not authorized.' },
      { status: 401 },
    );
  }

  const data = await client.fetch(eventsQuery);

  // If there's no event data in Sanity CMS, seed predefined events
  if (!data.length) {
    try {
      await seed();
      await redisClient.flushdb((err) => {
        if (err) {
          console.error('Error on clearing redis:', err);
        }
      });
    } catch (error) {
      console.error('Error on seeding initial events data:', error);
    }
  }

  return NextResponse.json({ events: data });
}
