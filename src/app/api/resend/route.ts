import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { randomUUID } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);
const MAX_ATTEMPTS = 5;
const TOKEN_EXPIRATION_HOURS = 2;

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email requerido' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

  const attempts = await prisma.resendAttempt.count({
    where: {
      email,
      createdAt: {
        gte: new Date(Date.now() - 1000 * 60 * 60) // Última hora
      }
    }
  });

  if (attempts >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: 'Demasiados intentos. Intenta más tarde.' }, { status: 429 });
  }

  await prisma.resendAttempt.create({
    data: {
      email,
      ip: req.headers.get('x-forwarded-for') || null
    }
  });

  const newToken = randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * TOKEN_EXPIRATION_HOURS);

  await prisma.verificationToken.create({
    data: {
      token: newToken,
      userId: user.id,
      expiresAt: expires
    }
  });

  await resend.emails.send({
    from: 'noreply@tuapp.com',
    to: user.email,
    subject: 'Nuevo enlace de verificación',
    html: `<a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${newToken}">Verificar cuenta</a>`
  });

  return NextResponse.json({ success: true });
}