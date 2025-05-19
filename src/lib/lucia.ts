import { Lucia } from 'lucia';
import { prisma } from '@/lib/prisma';

export const lucia = new Lucia(prisma, {
  sessionCookie: {
    name: 'session',
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
});