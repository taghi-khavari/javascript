import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest) {
  const { 0: client, 1: server } = new WebSocketPair();
  server.accept();
  server.addEventListener('message', (event) => {
    server.send(event.data);
  });
  return new Response(null, { status: 101, webSocket: client });
}
