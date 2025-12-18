import type { Express } from "express";
import { healthRouter } from "./health.router.js";
import { authRouter } from "./auth.router.js";

export function registerRoutes(app: Express, basePath: string) {
  app.use(`${basePath}/health`, healthRouter);
  app.use(`${basePath}/auth`, authRouter);
}
