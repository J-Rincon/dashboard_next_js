import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth/sessions';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await validateSession();
  if (!session) return NextResponse.json({ user: null }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      isActive: true,
      role: {
        select: {
          name: true,
          permissions: true
        }
      }
    }
  });

  return NextResponse.json({ user });
}