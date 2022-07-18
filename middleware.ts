import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname == '/' || pathname == '') {
    return NextResponse.rewrite(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
}
