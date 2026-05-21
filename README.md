<div align="center">
  <h1>🚀 Loop</h1>
  <p><i>La red social donde el ecosistema IT conecta, comparte y evoluciona.</i></p>
</div>

---

## 📖 Sobre el Proyecto

**Loop** es una plataforma creada como Trabajo de Fin de Grado (TFG) con el objetivo de reunir a desarrolladores y profesionales del sector IT en un mismo espacio.

La idea principal es proporcionar un entorno vibrante donde los usuarios puedan:

- 💡 **Compartir ideas y opiniones** sobre el mundo tecnológico.
- 🎯 **Afrontar retos y exponer problemas** para encontrar soluciones conjuntas.
- 📚 **Proveer recursos** para facilitar el día a día de otros profesionales.
- 🌱 **Mentoring natural:** Ofrecer a los perfiles más junior la oportunidad de ver el desarrollo de software desde dentro, aprender nuevos términos, potenciar sus habilidades y nutrirse de la experiencia de perfiles senior.

---

## 🛠️ Tecnologías Usadas

El proyecto está dividido en dos partes principales, utilizando un stack moderno, reactivo y escalable, pensado para una red social dinámica:

### Frontend

El lado del cliente está construido para ser rápido, reactivo y ofrecer la mejor experiencia de usuario (UX/UI).

- ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) **Next.js 16** - Framework de React moderno.
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) **React 19** - Librería principal para construir la UI.
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS v4** - Estilos rápidos y modernos.
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript** - Tipado estático para mayor robustez.
- ![ShadCN](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white) **ShadCN** - Componentes accesibles.
- ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) **React Query** - Gestión eficiente del estado asíncrono en componentes clientes.

### Backend

El servidor está desarrollado pensando en una arquitectura sólida, mantenible y segura.

- ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) **NestJS 11** - Framework backend avanzado para Node.js.
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) **Prisma ORM** - Gestión de la base de datos tipada.
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) **PostgreSQL** - Base de datos principal.
- ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) **Supabase** - Integración y pooling de base de datos.
- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) **Docker** - Contenerización del entorno.
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) **Passport & JWT** - Autenticación y seguridad (OAuth con Google y GitHub).
- ![Resend](https://img.shields.io/badge/Resend-black?style=for-the-badge&logo=resend&logoColor=white) **Resend & React Email** - Servicio de envío de correos transaccionales.

---

## ⚙️ Ejecución y Desarrollo

El proyecto está preparado para levantarse rápidamente utilizando Docker Compose en entornos de desarrollo.

### Levantar el proyecto

```bash
docker compose -f docker-compose.dev.yml up --build
```

### Parar los contenedores

```bash
docker-compose -f docker-compose.dev.yml stop
```

<details>
<summary><b>Permisos adicionales (Entornos de clase)</b></summary>
<br>
Si estás trabajando en ordenadores de clase y surgen problemas de permisos, puedes necesitar el siguiente comando (o similar) configurado en el entorno de los contenedores:

```bash
CMD ["sh", "-c", "npx prisma generate && chown -R 1001:1001 node_modules/.prisma && npm run start:dev"]
```

</details>

---

## 👨‍💻 Autor

- **Cristian Sánchez Lagos** - Desarrollador y creador de Loop (TFG).
