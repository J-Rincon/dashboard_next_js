import { authGuard } from '@/lib/auth/guard';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/settings'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    return authGuard(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*']
};