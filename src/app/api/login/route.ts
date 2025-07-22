import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';
import { createSession } from '@/lib/auth/sessions';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });

  const valid = await compare(password, user.passwordHash);
  if (!valid) return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });

  await createSession(user.id);
  return NextResponse.json({ success: true });
}