import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

