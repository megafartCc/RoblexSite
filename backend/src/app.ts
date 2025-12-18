import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { registerRoutes } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/index.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

  registerRoutes(app, env.API_BASE_PATH);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
