import { NextResponse } from 'next/server';
import { destroySession } from '@/lib/auth/sessions';

export async function POST() {
  await destroySession();
  return NextResponse.json({ success: true });
}