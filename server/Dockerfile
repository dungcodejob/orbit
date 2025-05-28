# Base stage cho dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build:all

# API Gateway stage
FROM node:18-alpine AS api-gateway
WORKDIR /app
COPY --from=builder /app/dist/apps/api-gateway ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/main.js"]

# Identity Service stage
FROM node:18-alpine AS identity-service
WORKDIR /app
COPY --from=builder /app/dist/apps/identity ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY --from=builder /app/apps/identity/prisma ./prisma
RUN npx prisma generate
EXPOSE 3001
CMD ["node", "dist/main.js"]

# Product Service stage
FROM node:18-alpine AS product-service
WORKDIR /app
COPY --from=builder /app/dist/apps/product ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY --from=builder /app/apps/product/prisma ./prisma
RUN npx prisma generate
EXPOSE 3002
CMD ["node", "dist/main.js"]

# Order Service stage
FROM node:18-alpine AS order-service
WORKDIR /app
COPY --from=builder /app/dist/apps/order ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY --from=builder /app/apps/order/prisma ./prisma
RUN npx prisma generate
EXPOSE 3003
CMD ["node", "dist/main.js"]