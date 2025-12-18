import type { Express } from "express";
import { healthRouter } from "./health.router.js";

export function registerRoutes(app: Express, basePath: string) {
  app.use(`${basePath}/health`, healthRouter);
}
