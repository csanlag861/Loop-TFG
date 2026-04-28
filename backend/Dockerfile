# ============================================
# STAGE 1: Build
# ============================================
FROM node:20-alpine AS build

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY prisma ./prisma/

# ❌ ANTES (solo production, no instala nest cli):
# RUN npm ci --only=production

# ✅ AHORA (instala TODO, incluyendo devDependencies):
RUN npm ci && \
    npm cache clean --force

# Copiar código fuente
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Build del proyecto (ahora SÍ encuentra nest)
RUN npm run build

# ============================================
# STAGE 2: Production
# ============================================
FROM node:20-alpine AS production

WORKDIR /app

# Instalar bash si lo necesitas
RUN apk add --no-cache bash && \
    rm -rf /var/cache/apk/*

# Copiar SOLO node_modules de producción
# (se instalarán de nuevo solo las deps de producción)
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar archivos compilados desde build
COPY --from=build /app/dist ./dist

# Copiar Prisma
COPY --from=build /app/prisma ./prisma

# Copiar entrypoint
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Exponer puerto
EXPOSE 3000

# Entrypoint
ENTRYPOINT ["./entrypoint.sh"]