import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || 'pub-0000000000000000';
  const content = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
