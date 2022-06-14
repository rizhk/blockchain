import { NextResponse, NextRequest } from 'next/server'
export async function middleware(req, ev) {
    const { pathname } = req.nextUrl
    if (pathname == '/' || pathname  == '') {
        return NextResponse.rewrite(new URL('/dashboard', req.url))
    }
    return NextResponse.next()
}



