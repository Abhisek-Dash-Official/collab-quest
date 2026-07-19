import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkIsAdmin } from '@/lib/auth';

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path.startsWith('/admin')) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const isAdmin = await checkIsAdmin(token);

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};