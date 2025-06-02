#!/bin/sh


echo "⏳ Running MikroORM migrations..."
npx mikro-orm migration:up

echo "🚀 Starting NestJS server..."
exec node dist/main