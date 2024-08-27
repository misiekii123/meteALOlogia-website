FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json .
COPY tsconfig.json vite.config.ts svelte.config.js .
COPY src src/
COPY static static/

RUN npm ci --omit dev

RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
ENV PORT=80
EXPOSE 80
ENTRYPOINT [ "node", "-r", "dotenv/config", "build" ]