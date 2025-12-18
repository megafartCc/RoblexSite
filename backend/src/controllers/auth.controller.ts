import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { pool } from "../db/pool.js";
import { env } from "../config/env.js";
import { HttpError } from "../middleware/index.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

type UserRow = {
  id: number;
  email: string;
  password_hash: string;
  role: string | null;
};

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new HttpError("Invalid credentials payload", 400);
  }

  const { email, password } = parsed.data;

  const [rows] = await pool.query<UserRow[]>(
    "SELECT id, email, password_hash, role FROM users WHERE email = ? LIMIT 1",
    [email],
  );

  const user = rows[0];

  if (!user) {
    throw new HttpError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    throw new HttpError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role ?? "admin",
    },
    env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role ?? "admin",
    },
  });
}

