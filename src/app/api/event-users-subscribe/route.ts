// cspell:ignore psubscribe pmessage punsubscribe

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import redisClient from '@/modules/redis';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { message: 'You are not authorized.' },
      { status: 401 },
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const subscriber = redisClient.duplicate();

      await subscriber.psubscribe('*', (error) => {
        if (error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      });

      subscriber.on('pmessage', (_pattern, _channel, message) => {
        const messageData = JSON.parse(message);

        if (!messageData) {
          return NextResponse.json(
            { message: 'Server error' },
            { status: 500 },
          );
        }

        const { userId, eventIds } = messageData;

        const data = JSON.stringify({
          [userId]: eventIds,
        });

        controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
      });

      req.signal?.addEventListener('abort', () => {
        void subscriber.punsubscribe('*');
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
