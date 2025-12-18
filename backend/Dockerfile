FROM node:20-alpine AS build
WORKDIR /app/backend

# These COPY paths assume the Docker build context is the repo root.
COPY backend/package.json ./
RUN npm install

COPY backend/tsconfig.json ./
COPY backend/src ./src

RUN npm run build
RUN npm prune --omit=dev

FROM node:20-alpine AS runtime
WORKDIR /app/backend
ENV NODE_ENV=production

COPY --from=build /app/backend/package.json ./package.json
COPY --from=build /app/backend/node_modules ./node_modules
COPY --from=build /app/backend/dist ./dist

EXPOSE 8080
CMD ["node", "dist/server.js"]
