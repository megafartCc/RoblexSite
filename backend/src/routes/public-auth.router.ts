import { Router } from "express";
import { publicLogin, publicRegister } from "../controllers/auth.controller.js";

export const publicAuthRouter = Router();

publicAuthRouter.post("/login", async (req, res, next) => {
  try {
    await publicLogin(req, res);
  } catch (error) {
    next(error);
  }
});

publicAuthRouter.post("/register", async (req, res, next) => {
  try {
    await publicRegister(req, res);
  } catch (error) {
    next(error);
  }
});
