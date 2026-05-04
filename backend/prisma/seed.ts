import 'dotenv/config';
import { PrismaClient, Tecnologia } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Seed principal - Crea datos de ejemplo para desarrollo y testing
 * Este archivo es completamente independiente del código fuente de la aplicación
 */
async function main() {
  const saltRounds = 10;

  // Limpieza de datos existentes
  await prisma.post.deleteMany({});
  await prisma.tecnologia.deleteMany({});

  // 1️⃣ Crear roles
  await prisma.rol.createMany({
    data: [
      { nombre: 'ADMIN', slug: 'admin' },
      { nombre: 'USUARIO', slug: 'usuario' },
      { nombre: 'MODERADOR', slug: 'moderador' },
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
      nombre: 'Cristian',
      username: 'csanlag861',
      email: 'carlos@example.com',
      biografia: 'Fullstack developer apasionado por Angular y NodeJS',
      password: bcrypt.hashSync('123456', saltRounds),
      rol_id: 1,
      avatarURL:
        'https://bmumcurtyjxqdrmnzptq.supabase.co/storage/v1/object/public/avatars/avatar_1.png',
    },
    {
      nombre: 'Laura Gómez',
      username: 'laura_front',
      email: 'laura@example.com',
      biografia: 'Frontend engineer, React y TypeScript son mi vida',
      password: bcrypt.hashSync('123456', saltRounds),
      rol_id: 2,
      avatarURL:
        'https://bmumcurtyjxqdrmnzptq.supabase.co/storage/v1/object/public/avatars/avatar_1.png',
    },
    {
      nombre: 'Miguel Sánchez',
      username: 'miguel_backend',
      email: 'miguel@example.com',
      biografia: 'Backend developer, experto en NodeJS y bases de datos',
      password: bcrypt.hashSync('123456', saltRounds),
      rol_id: 2,
      avatarURL:
        'https://bmumcurtyjxqdrmnzptq.supabase.co/storage/v1/object/public/avatars/avatar_2.png',
    },
    {
      nombre: 'Elena Ruiz',
      username: 'elena_cloud',
      email: 'elena@example.com',
      biografia: 'Ingeniera cloud, AWS y Docker son mis herramientas',
      password: bcrypt.hashSync('123456', saltRounds),
      rol_id: 2,
      avatarURL:
        'https://bmumcurtyjxqdrmnzptq.supabase.co/storage/v1/object/public/avatars/avatar_1.png',
    },
    {
      nombre: 'Javier Torres',
      username: 'javi_fullstack',
      email: 'javier@example.com',
      biografia: 'Desarrollador Fullstack, React y NestJS',
      password: bcrypt.hashSync('123456', saltRounds),
      rol_id: 2,
      avatarURL:
        'https://bmumcurtyjxqdrmnzptq.supabase.co/storage/v1/object/public/avatars/avatar_4.png',
    },
    {
      nombre: 'Yara López',
      username: 'yara_loopez',
      email: 'ana@example.com',
      biografia: 'Data engineer, Python y PostgreSQL',
      password: bcrypt.hashSync('123456', saltRounds),
      rol_id: 2,
      avatarURL:
        'https://bmumcurtyjxqdrmnzptq.supabase.co/storage/v1/object/public/avatars/avatar_1.png',
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

  /**
   * Función helper para obtener tecnologías aleatorias
   * @param tecnologias - Array de tecnologías disponibles
   * @param max - Número máximo de tecnologías a retornar
   * @returns Array de tecnologías seleccionadas aleatoriamente
   */
  function getRandomTechnologies(
    tecnologias: Tecnologia[],
    max = 3,
  ): Tecnologia[] {
    const shuffled = [...tecnologias].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, max);
  }

  for (const content of postContents) {
    const randomUser = usuarios[Math.floor(Math.random() * usuarios.length)];
    const relatedTech = getRandomTechnologies(tecnologias, 3);

    await prisma.post.create({
      data: {
        usuario_id: randomUser.id,
        contenido: content,
        tecnologias: {
          connect: relatedTech.map((t) => ({ id: t.id })),
        },
      },
    });
  }

  // 5️⃣ Crear carpetas de favoritos para cada usuario
  for (const user of usuarios) {
    const carpeta = await prisma.carpeta.create({
      data: {
        nombre: 'Favoritos',
        usuario_id: user.id,
      },
    });

    // 6️⃣ Guardar algunos posts en la carpeta de favoritos aleatoriamente
    // Elegimos algunos usuarios que tendrán posts guardados
    const guardarPosts = Math.random() > 0.3; // 70% de probabilidades de guardar posts
    if (guardarPosts) {
      const postsParaGuardar = [...postContents]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 5) + 1); // entre 1 y 5 posts

      for (const content of postsParaGuardar) {
        // Encontramos el post por contenido
        const post = await prisma.post.findFirst({
          where: { contenido: content },
        });
        if (!post) continue;

        await prisma.postGuardado.create({
          data: {
            post_id: post.id,
            carpeta_id: carpeta.id,
            usuario_id: user.id,
          },
        });
      }
    }
  }

  console.log('✅ Seed completado correctamente');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error ejecutando seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
