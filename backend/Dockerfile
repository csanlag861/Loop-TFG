FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build


FROM node:20 AS production
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app .

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

EXPOSE 3000

CMD ["./entrypoint.sh"]