import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/register", async (req, res, next) => {
  try {
    await register(req, res);
  } catch (error) {
    next(error);
  }
});

