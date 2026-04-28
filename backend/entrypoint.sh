#!/bin/sh

echo "⏳ Waiting for database..."
echo "DATABASE_URL=$DATABASE_URL"

until npx prisma migrate deploy; do
  echo "❌ Migration failed, retrying in 3s..."
  sleep 3
done

echo "✅ Migrations applied"

echo "🌱 Running seed..."
npx prisma db seed || echo "⚠️ Seed skipped"

echo "🚀 Starting app..."
node dist/main