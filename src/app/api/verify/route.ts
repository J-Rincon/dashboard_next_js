import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  //TODO: create a cron job to delete expired tokens
  // This is a temporary solution to delete expired tokens
  await prisma.verificationToken.deleteMany({ where: { expiresAt: { lt: new Date() } } });

  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Token is required' }, { status: 400 });

  const dbToken = await prisma.verificationToken.findUnique({ where: { token } });
  if (!dbToken || dbToken.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  await prisma.user.update({ where: { id: dbToken.userId }, data: { emailVerified: true } });
  await prisma.verificationToken.delete({ where: { token } });

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/set-password?token=${token}`);
}