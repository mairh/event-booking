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

  const stream = new ReadableStream({
    // eslint-disable-next-line @typescript-eslint/require-await
    async start(controller) {
      const subscription = client
        .listen(eventsQuery, {}, { includeResult: true })
        .subscribe((update) => {
          const events = JSON.stringify(update);

          controller.enqueue(new TextEncoder().encode(`data: ${events}\n\n`));
        });

      req.signal?.addEventListener('abort', () => {
        subscription.unsubscribe();
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
