# ============================================
# STAGE 1: Build
# ============================================
FROM node:20-alpine AS build

WORKDIR /app

# Copiar solo package files primero (para aprovechar caché)
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias (solo las necesarias para build)
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar el resto del código
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Build del proyecto
RUN npm run build

# ============================================
# STAGE 2: Production
# ============================================
FROM node:20-alpine AS production

WORKDIR /app

# Instalar solo bash (si lo necesitas) y limpiar caché
RUN apk add --no-cache bash && \
    rm -rf /var/cache/apk/*

# Copiar dependencias ya instaladas desde build
COPY --from=build /app/node_modules ./node_modules

# Copiar archivos compilados
COPY --from=build /app/dist ./dist

# Copiar Prisma schema y client generado
COPY --from=build /app/prisma ./prisma

# Copiar entrypoint
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Exponer puerto
EXPOSE 3000

# Usar entrypoint
ENTRYPOINT ["./entrypoint.sh"]