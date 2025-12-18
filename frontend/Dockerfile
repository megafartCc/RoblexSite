FROM node:20-alpine AS build
WORKDIR /app/frontend

# These COPY paths assume the Docker build context is the repo root.
COPY frontend/package.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/frontend/dist ./dist
COPY --from=build /app/frontend/server.mjs ./server.mjs

EXPOSE 3000
CMD ["node", "server.mjs"]
