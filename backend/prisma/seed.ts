/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { prisma } from '../src/lib/prisma';
import { SlugRol } from '../src/common/enums/slug-rol.enum';

async function main() {
  await prisma.post.deleteMany({});
  await prisma.tecnologia.deleteMany({});
  // 1️⃣ Crear roles
  await prisma.rol.createMany({
    data: [
      { nombre: 'ADMIN', slug: SlugRol.ADMIN },
      { nombre: 'USUARIO', slug: SlugRol.USUARIO },
      { nombre: 'MODERADOR', slug: SlugRol.MODERADOR },
    ],
    skipDuplicates: true,
  });

  // 2️⃣ Crear tecnologías
  const tecnologiasSeed = [
    {
      nombre: 'Angular',
      background: '#260B0B',
      border: '#521E1E',
      text: '#FF6E6E',
    },
    {
      nombre: 'TypeScript',
      background: '#0B0B26',
      border: '#1E1E52',
      text: '#6E6EFF',
    },
    {
      nombre: 'React',
      background: '#0B1A26',
      border: '#1E3A52',
      text: '#6EC1FF',
    },
    {
      nombre: 'NodeJS',
      background: '#1A260B',
      border: '#3A521E',
      text: '#C1FF6E',
    },
    {
      nombre: 'PHP',
      background: '#260B26',
      border: '#521E52',
      text: '#FF6EC1',
    },
    {
      nombre: 'Java',
      background: '#261A0B',
      border: '#523A1E',
      text: '#FFC16E',
    },
    {
      nombre: 'Docker',
      background: '#0B2626',
      border: '#1E5252',
      text: '#6EFFC1',
    },
    {
      nombre: 'AWS',
      background: '#1A0B26',
      border: '#3A1E52',
      text: '#C16EFF',
    },
    {
      nombre: 'Azure',
      background: '#0B1A26',
      border: '#1E3A52',
      text: '#6EC1FF',
    },
    {
      nombre: 'Python',
      background: '#1A260B',
      border: '#3A521E',
      text: '#C1FF6E',
    },
    {
      nombre: 'MongoDB',
      background: '#0B260B',
      border: '#1E523A',
      text: '#6EFFC1',
    },
    {
      nombre: 'PostgreSQL',
      background: '#0B1A26',
      border: '#1E3A52',
      text: '#6EC1FF',
    },
    {
      nombre: 'Kubernetes',
      background: '#0B2626',
      border: '#1E5252',
      text: '#6EFFC1',
    },
    {
      nombre: 'GraphQL',
      background: '#260B1A',
      border: '#521E3A',
      text: '#FF6EC1',
    },
    {
      nombre: 'NestJS',
      background: '#260B0B',
      border: '#521E1E',
      text: '#FF6E6E',
    },
  ];

  for (const tech of tecnologiasSeed) {
    await prisma.tecnologia.upsert({
      where: { nombre: tech.nombre },
      update: {
        background: tech.background,
        border: tech.border,
        text: tech.text,
      },
      create: tech,
    });
  }

  const tecnologias = await prisma.tecnologia.findMany();

  // 3️⃣ Crear usuarios
  const usuariosData = [
    {
      nombre: 'Carlos Martínez',
      username: 'carlos_dev',
      email: 'carlos@example.com',
      biografia: 'Fullstack developer apasionado por Angular y NodeJS',
      password: '123456',
      rol_id: 1,
    },
    {
      nombre: 'Laura Gómez',
      username: 'laura_front',
      email: 'laura@example.com',
      biografia: 'Frontend engineer, React y TypeScript son mi vida',
      password: '123456',
      rol_id: 2,
    },
    {
      nombre: 'Miguel Sánchez',
      username: 'miguel_backend',
      email: 'miguel@example.com',
      biografia: 'Backend developer, experto en NodeJS y bases de datos',
      password: '123456',
      rol_id: 2,
    },
    {
      nombre: 'Elena Ruiz',
      username: 'elena_cloud',
      email: 'elena@example.com',
      biografia: 'Ingeniera cloud, AWS y Docker son mis herramientas',
      password: '123456',
      rol_id: 2,
    },
    {
      nombre: 'Javier Torres',
      username: 'javi_fullstack',
      email: 'javier@example.com',
      biografia: 'Desarrollador Fullstack, React y NestJS',
      password: '123456',
      rol_id: 2,
    },
    {
      nombre: 'Ana López',
      username: 'ana_data',
      email: 'ana@example.com',
      biografia: 'Data engineer, Python y PostgreSQL',
      password: '123456',
      rol_id: 2,
    },
  ];

  for (const user of usuariosData) {
    await prisma.usuario.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  const usuarios = await prisma.usuario.findMany();

  // 4️⃣ Crear posts
  const postContents = [
    'Acabo de subir un proyecto en Angular con integración a AWS',
    'Hoy he aprendido a optimizar consultas en PostgreSQL',
    'React Hooks facilitan mucho la gestión del estado',
    'NodeJS es excelente para APIs rápidas y escalables',
    'Docker me ha salvado de problemas de dependencias',
    'GraphQL permite consultas más limpias que REST',
    'NestJS combina TypeScript y NodeJS de forma elegante',
    'AWS Lambda me permite serverless sin complicaciones',
    'Kubernetes facilita el despliegue de microservicios',
    'PHP sigue vivo y con buen rendimiento en backends',
    'Python es mi lenguaje favorito para scripts y data',
    'Azure DevOps simplifica la CI/CD de proyectos grandes',
    'MongoDB es flexible para datos no estructurados',
    'TypeScript ayuda a reducir errores en tiempo de compilación',
    'Aprender Docker y Kubernetes juntos es un must para DevOps',
  ];

  function getRandomTechnologies(tecnologias, max = 3) {
    const shuffled = [...tecnologias].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, max);
  }

  for (const content of postContents) {
    const randomUser = usuarios[Math.floor(Math.random() * usuarios.length)];
    const relatedTech = getRandomTechnologies(tecnologias, 3);

    const post = await prisma.post.create({
      data: {
        usuario_id: randomUser.id,
        contenido: content,
        tecnologias: {
          connect: relatedTech.map((t) => ({ id: t.id })),
        },
      },
    });
  }

  console.log('✅ Seed completado correctamente');
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
