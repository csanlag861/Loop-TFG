/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.rol.createMany({
    data: [
      { nombre: 'ADMINISTRADOR' },
      { nombre: 'USUARIO' },
      { nombre: 'MODERADOR' },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
