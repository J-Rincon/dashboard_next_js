'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache'

export async function getAllUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  })
}

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const roleId = formData.get('roleId') as string

  // await prisma.user.create({
  //   data: {
  //     name,
  //     email,
  //     username,
  //     password, // 🔒 en producción, encripta esto
  //     roleId,
  //   },
  // })

  // revalidatePath('/users') // Revalida vista si es necesario
}