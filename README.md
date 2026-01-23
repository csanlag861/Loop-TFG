# Loop-TFG
Repositorio de mi aplicación web presentada para el TFG

## Para levantar el proyecto con Docker hay que lanzar este comando:
> docker compose -f docker-compose.dev.yml up --build

Para parar los contenedores:
> docker-compose -f docker-compose.dev.yml stop

Permisos cuando trabaje en clase:
> CMD ["sh", "-c", "npx prisma generate && chown -R 1001:1001 node_modules/.prisma && npm run start:dev"]
