# Base stage for all services
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# API Gateway stage
FROM node:18-alpine AS api-gateway
WORKDIR /app
COPY --from=base /app/dist/apps/api-gateway ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
EXPOSE 3000
CMD ["node", "dist/main.js"]

# Identity Service stage
FROM node:18-alpine AS identity-service
WORKDIR /app
COPY --from=base /app/dist/apps/identity ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /app/apps/identity/prisma ./prisma
RUN npx prisma generate
EXPOSE 3001
CMD ["node", "dist/main.js"]

# Product Service stage
FROM node:18-alpine AS product-service
WORKDIR /app
COPY --from=base /app/dist/apps/product ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /app/apps/product/prisma ./prisma
RUN npx prisma generate
EXPOSE 3002
CMD ["node", "dist/main.js"]

# Order Service stage
FROM node:18-alpine AS order-service
WORKDIR /app
COPY --from=base /app/dist/apps/order ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /app/apps/order/prisma ./prisma
RUN npx prisma generate
EXPOSE 3003
CMD ["node", "dist/main.js"]