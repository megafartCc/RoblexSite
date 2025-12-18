# RoblexSite Monorepo

Infrastructure-ready codebase for the Roblex admin experience. The repository now contains:

- `frontend/`: React + Vite + TypeScript SPA
- `backend/`: Express + TypeScript API skeleton

Both apps are isolated so Railway (or any platform) can deploy them as separate services.

## Project structure

```
RoblexSite/
├─ frontend/   # Public admin UI
└─ backend/    # REST API placeholder
```

## Frontend workflow

```bash
cd frontend
npm install
npm run dev        # local dev server
npm run build      # production build to dist/
```

Deploy on Railway as a static build. Set **Build Command** = `npm run build` and **Output Directory** = `dist`.

## Backend workflow

```bash
cd backend
npm install
npm run dev        # ts-node-dev watcher
npm run build      # emit dist/
npm start          # run compiled server
```

Expose `backend/dist/server.js` on Railway as a Node service (set start command to `npm start`). The default API base path is `/api` with a `GET /api/health` endpoint for monitoring.

## Environment & configuration

- Copy `backend/.env.example` to `backend/.env` for local development.
- Customize `API_BASE_PATH` or `PORT` as needed before deploying.

## Recommended next steps

1. Implement authentication + domain logic inside `backend/src`.
2. Consume the backend API from the React app via environment-based base URLs.
3. Add CI (e.g., GitHub Actions) to lint/build both services on pull requests.
