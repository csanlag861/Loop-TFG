#!/bin/sh

if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL is not set. Aborting."
  exit 1
fi

echo "⏳ Waiting for database..."

until npx prisma migrate deploy; do
  echo "❌ Migration failed, retrying in 3s..."
  sleep 3
done

echo "✅ Migrations applied"
echo "🌱 Running seed..."
npx prisma db seed || echo "⚠️ Seed skipped"

echo "🚀 Starting app..."
node dist/main