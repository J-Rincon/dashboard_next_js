import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token, password } = await req.json();
  if (!token || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const dbToken = await prisma.verificationToken.findUnique({ where: { token } });
  if (!dbToken) return NextResponse.json({ error: 'Invalid token' }, { status: 400 });

  const passwordHash = await hash(password, 10);
  await prisma.user.update({
    where: { id: dbToken.userId },
    data: {
      passwordHash,
      emailVerified: true,
      isActive: true
    }
  });

  await prisma.verificationToken.delete({ where: { token } });

  return NextResponse.json({ success: true });
}