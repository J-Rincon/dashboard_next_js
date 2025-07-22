import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from './sessions';

export async function authGuard(request: NextRequest) {
  const session = await validateSession();
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}