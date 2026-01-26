> Para levantar un cliente de bbdd en local
npx prisma studio --config ./prisma.config.ts

UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  create(createPostDto: CreatePostDto) {
    return;
  }

como consigo acceder al id del usuario que está queriendo crear el post? más que nada porque la creación de un post conlleva lo siguiente: 
model Post {
  id         Int      @id @default(autoincrement())
  usuario_id Int
  usuario    Usuario  @relation(fields: [usuario_id], references: [id])
  contenido  String   @db.VarChar(280)
  createdAt  DateTime @default(now())

  tecnologias   Tecnologia[]
  postGuardados PostGuardado[]
}

y el usuario solo me pasará el contenido, y la tecnologia 

Muy buena pregunta—esto es clave en APIs con autenticación 👇

Tu caso es típico:
👉 El usuario NO envía usuario_id
👉 Lo sacas del JWT que valida el JwtAuthGuard

🧠 Cómo funciona en NestJS

Cuando usas:

@UseGuards(JwtAuthGuard)


Tu guard inyecta el usuario en req.user (si usas Passport JWT estándar).

✅ OPCIÓN 1 (SIMPLE): usar @Req()
Controller
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Post('create')
create(@Body() dto: CreatePostDto, @Req() req: Request) {
  const user = req.user;
  return this.postService.create(dto, user);
}

Service
create(dto: CreatePostDto, user: any) {
  return this.prisma.post.create({
    data: {
      contenido: dto.contenido,
      usuario_id: user.id,
      tecnologias: {
        connect: dto.tecnologias.map(id => ({ id })),
      },
    },
  });
}

✅ OPCIÓN 2 (PRO): Crear un decorator @User()

Esto es lo que se hace en proyectos profesionales 👇

1️⃣ Decorator custom
// src/auth/decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

2️⃣ Usarlo en el controller
@UseGuards(JwtAuthGuard)
@Post('create')
create(@Body() dto: CreatePostDto, @User() user) {
  return this.postService.create(dto, user);
}


🔥 Mucho más limpio.

✅ OPCIÓN 3 (AÚN MÁS PRO): tipar el usuario

Si tu JWT payload es:

export interface JwtPayload {
  id: number;
  username: string;
}


Entonces:

create(@Body() dto: CreatePostDto, @User() user: JwtPayload)

🧩 Cómo debería ser tu CreatePostDto
export class CreatePostDto {
  contenido: string;
  tecnologias: number[]; // ids
}

✅ Prisma create con relaciones MANY-TO-MANY
return this.prisma.post.create({
  data: {
    contenido: dto.contenido,
    usuario: {
      connect: { id: user.id },
    },
    tecnologias: {
      connect: dto.tecnologias.map(id => ({ id })),
    },
  },
});

⚠️ ERROR MUY COMÚN

❌ No hagas esto:

usuario_id: dto.usuario_id


Porque el cliente podría crear posts como otro usuario → SECURITY BUG.

🧠 Flujo real

Usuario hace login → recibe JWT

Frontend envía:

POST /api/post/create
Authorization: Bearer TOKEN
{
  "contenido": "Hola mundo",
  "tecnologias": [1, 2, 5]
}


NestJS lee el JWT → req.user.id

Prisma crea el post con ese usuario

💎 Bonus PRO TIP

En proyectos grandes se usa:

@Post()
create(@Body() dto: CreatePostDto, @User('id') userId: number)


Decorator mejorado:

return request.user[data];

Si quieres

Te puedo mostrar cómo configurar JwtStrategy para que req.user.id exista (muchos tutoriales lo hacen mal)
o cómo devolver el post creado con usuario y tecnologías en una sola query Prisma.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
