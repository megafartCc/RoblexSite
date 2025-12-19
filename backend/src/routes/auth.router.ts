import { Router } from "express";
import {
  login,
  register,
  setupTwoFactor,
  verifyTwoFactor,
} from "../controllers/auth.controller.js";

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

authRouter.post("/2fa/setup", async (req, res, next) => {
  try {
    await setupTwoFactor(req, res);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/2fa/verify", async (req, res, next) => {
  try {
    await verifyTwoFactor(req, res);
  } catch (error) {
    next(error);
  }
});

