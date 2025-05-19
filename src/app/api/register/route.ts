import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TOKEN_EXPIRATION_HOURS = 2;

export async function POST(req: Request) {
  const { email, name, username, roleId } = await req.json();
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const user = await prisma.user.create({
    data: {
      email,
      name,
      username,
      roleId
    }
  });

  const token = randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * TOKEN_EXPIRATION_HOURS);
  await prisma.verificationToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: expires
    }
  });

  await resend.emails.send({
    from: 'noreply@tuapp.com',
    to: email,
    subject: 'Verify your account',
    html: `<a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}">Verify Account</a>`
  });

  return NextResponse.json({ success: true });
}