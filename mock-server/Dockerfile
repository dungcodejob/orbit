# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json bun.lock* ./
RUN npm install -g bun && bun install
COPY . .
RUN bun run build || npm run build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 4200
CMD ["npm", "run", "start"]