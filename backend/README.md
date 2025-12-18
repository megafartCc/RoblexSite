# RoblexSite API

TypeScript + Express service that powers the Roblex admin experience.

## Development

```bash
cd backend
npm install
npm run dev
```

The server loads environment variables from `.env`. Copy `.env.example` to `.env` for local development.

## Production build

```bash
npm run build
npm start
```

The build emits TypeScript output in `dist/` and `npm start` runs the compiled server.

## Environment variables

| Name          | Description                              | Default      |
| ------------- | ---------------------------------------- | ------------ |
| `NODE_ENV`    | Runtime environment (`development`, etc.)| `development`|
| `PORT`        | HTTP port                                | `8080`       |
| `API_BASE_PATH` | Prefix for all API routes             | `/api`       |

## Health endpoint

The template exposes `GET /api/health` returning uptime metadata for fast monitoring integrations or Railway health checks.
