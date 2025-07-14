'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getAllUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string

  await prisma.user.create({
    data: {
      name,
      email,
      username,
      password, // 🔒 en producción, encripta esto
      role,
    },
  })

  revalidatePath('/users') // Revalida vista si es necesario
}