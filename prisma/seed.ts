// This script is used to seed the database with initial data. It creates an admin user and some blocks in the database.
// It uses the Prisma Client to interact with the database. The script is executed using the command `npx prisma db seed`.

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  // Crear roles con permisos
  const roles = [
    {
      name: 'admin',
      permissions: [
        { module: 'fabrication', action: 'read' },
        { module: 'fabrication', action: 'write' },
        { module: 'fabrication', action: 'execute' },
      ],
    },
    {
      name: 'operador',
      permissions: [
        { module: 'fabrication', action: 'read' },
        { module: 'fabrication', action: 'execute' },
      ],
    },
  ];
  
  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: {
        name: role.name,
        permissions: {
          create: role.permissions,
        },
      },
    })
  }
  
  // Buscar rol admin
  const adminRole = await prisma.role.findUnique({
    where: { name: 'admin' },
  })

  if (!adminRole) throw new Error('No se encontró el rol admin')

  // Hashear contraseña
  const passwordHash = await bcrypt.hash('admin123', 10)

  // Crear usuario admin
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin Principal',
      email: 'admin@example.com',
      username: 'admin',
      password: passwordHash,
      isActive: true,
      roleId: adminRole.id,
    },
  })
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
