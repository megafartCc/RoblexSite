import type { Request, Response, NextFunction } from "express";

export function notFoundHandler(req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({
    message: "Resource not found",
    method: req.method,
    path: req.originalUrl,
  });
}
