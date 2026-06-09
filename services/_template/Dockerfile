# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace config
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/ ./packages/

# Copy service
COPY services/{{SERVICE_NAME}} ./services/{{SERVICE_NAME}}

RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile && \
    pnpm --filter @matcha/{{SERVICE_NAME}} build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/services/{{SERVICE_NAME}}/dist ./dist
COPY --from=builder /app/services/{{SERVICE_NAME}}/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/index.js"]
