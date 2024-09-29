import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { USER_EVENTS_CHANNEL } from '@/modules/common';
import redisClient from '@/modules/redis';

export async function GET(
  req: NextRequest,
  { params }: { params: { channel: string } },
) {
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

      const currentChannel = params.channel ?? USER_EVENTS_CHANNEL;

      await subscriber.subscribe(currentChannel, (error) => {
        if (error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      });

      subscriber.on('message', (channel, message) => {
        if (channel === currentChannel) {
          controller.enqueue(new TextEncoder().encode(`data: ${message}\n\n`));
        }
      });

      req.signal?.addEventListener('abort', () => {
        void subscriber.unsubscribe(currentChannel);
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
