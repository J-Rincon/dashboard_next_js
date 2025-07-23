import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { nanoid } from 'nanoid';

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'dashboardSessionId';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 días

export async function createSession(userId: string) {
  const sessionId = nanoid();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt
    }
  });
  await setSessionCookie(sessionId, expiresAt);
  return sessionId;
}

export async function setSessionCookie(sessionId: string, expires: Date) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires
  });
}

export async function validateSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    select: { userId: true, expiresAt: true }
  });

  if (!session || session.expiresAt < new Date()) return null;
  return { userId: session.userId };
}

export async function destroySession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return;
  await prisma.session.delete({ where: { id: sessionId } });
  cookieStore.delete(SESSION_COOKIE_NAME);
}