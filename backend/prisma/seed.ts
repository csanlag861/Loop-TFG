/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { prisma } from '../src/lib/prisma';
import { SlugRol } from '@/common/enums/slug-rol.enum';

async function main() {
  await prisma.rol.createMany({
    data: [
      { nombre: 'ADMIN', slug: SlugRol.ADMIN  },
      { nombre: 'USUARIO', slug: SlugRol.USUARIO },
      { nombre: 'MODERADOR', slug: SlugRol.MODERADOR },
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
