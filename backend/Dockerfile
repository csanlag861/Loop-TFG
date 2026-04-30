# ============================================
# STAGE 1: Build
# ============================================
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig*.json ./

RUN npm ci && npm cache clean --force

COPY . .

# prisma generate solo necesita saber el provider, no conectarse
# el fallback en prisma.config.ts cubre el caso de DATABASE_URL ausente
RUN npx prisma generate
RUN npm run build

# ============================================
# STAGE 2: Production
# ============================================
FROM node:20-alpine AS production
WORKDIR /app

RUN apk add --no-cache bash && rm -rf /var/cache/apk/*

# Copiar node_modules completos (incluye prisma CLI y el cliente generado)
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package*.json ./
COPY prisma.config.ts ./
COPY entrypoint.sh ./

RUN chmod +x entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]