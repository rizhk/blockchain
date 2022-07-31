import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('called');
  console.log(pathname);
  if (pathname == '/' || pathname == '') {
    return NextResponse.rewrite(new URL('/dashboard/portfolio', request.url));
  }
  return NextResponse.next();
}
