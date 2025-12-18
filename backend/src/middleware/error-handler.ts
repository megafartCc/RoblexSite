import type { Request, Response, NextFunction } from "express";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const status = err instanceof HttpError ? err.status : 500;
  const message = err instanceof Error ? err.message : "Unexpected error";

  if (status >= 500) {
    console.error("[Unhandled Error]", err);
  }

  res.status(status).json({
    message,
    status,
  });
}

export class HttpError extends Error {
  constructor(message: string, public status = 500) {
    super(message);
  }
}
