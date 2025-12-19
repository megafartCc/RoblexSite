import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticator } from "otplib";
import { z } from "zod";
import { pool } from "../db/pool.js";
import { env } from "../config/env.js";
import { HttpError } from "../middleware/index.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

const twoFaVerifySchema = z.object({
  token: z.string().length(6),
  tempToken: z.string().min(1),
});

const twoFaSetupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

const twoFaConfirmSchema = z.object({
  email: z.string().email(),
  token: z.string().length(6),
});

type UserRow = RowDataPacket & {
  id: number;
  email: string;
  password_hash: string;
  role: string | null;
  two_factor_secret: string | null;
  two_factor_enabled: number;
};

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new HttpError("Invalid credentials payload", 400);
  }

  const { email, password } = parsed.data;

  const [rows] = await pool.query<UserRow[]>(
    "SELECT id, email, password_hash, role, two_factor_secret, two_factor_enabled FROM users WHERE email = ? LIMIT 1",
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

  if (!user.two_factor_secret) {
    throw new HttpError(
      "2FA is required but not configured for this account. Please set it up first.",
      403,
    );
  }

  if (!user.two_factor_enabled) {
    throw new HttpError("Please finish 2FA setup for this account before logging in.", 403);
  }

  if (user.two_factor_enabled) {
    const tempToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        stage: "2fa",
      },
      env.JWT_SECRET,
      { expiresIn: "5m" },
    );

    res.json({
      requires2fa: true,
      tempToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role ?? "admin",
      },
    });
    return;
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

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new HttpError("Invalid registration payload", 400);
  }

  const { email, password } = parsed.data;

  const passwordHash = await bcrypt.hash(password, 12);

  await pool.query(
    `INSERT INTO users (email, password_hash, role)
     VALUES (?, ?, 'admin')`,
    [email, passwordHash],
  );

  res.status(201).json({ message: "Admin account created. You can now log in." });
}

export async function verifyTwoFactor(req: Request, res: Response) {
  const parsed = twoFaVerifySchema.safeParse(req.body);

  if (!parsed.success) {
    throw new HttpError("Invalid 2FA payload", 400);
  }

  const { token, tempToken } = parsed.data;

  let payload: any;

  try {
    payload = jwt.verify(tempToken, env.JWT_SECRET);
  } catch {
    throw new HttpError("Invalid or expired 2FA session", 401);
  }

  if (!payload || payload.stage !== "2fa" || typeof payload.sub !== "number") {
    throw new HttpError("Invalid 2FA session", 401);
  }

  const [rows] = await pool.query<UserRow[]>(
    "SELECT id, email, password_hash, role, two_factor_secret, two_factor_enabled FROM users WHERE id = ? LIMIT 1",
    [payload.sub],
  );

  const user = rows[0];

  if (!user || !user.two_factor_secret || !user.two_factor_enabled) {
    throw new HttpError("2FA is not configured for this account", 400);
  }

  const isValid = authenticator.check(token, user.two_factor_secret);

  if (!isValid) {
    throw new HttpError("Invalid 2FA code", 401);
  }

  const finalToken = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role ?? "admin",
    },
    env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.json({
    token: finalToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role ?? "admin",
    },
  });
}

export async function setupTwoFactor(req: Request, res: Response) {
  const parsed = twoFaSetupSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new HttpError("Invalid 2FA setup payload", 400);
  }

  const { email, password } = parsed.data;

  const [rows] = await pool.query<UserRow[]>(
    "SELECT id, email, password_hash, role, two_factor_secret, two_factor_enabled FROM users WHERE email = ? LIMIT 1",
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

  const secret = authenticator.generateSecret();
  const otpauthUrl = authenticator.keyuri(email, "RoblexSite", secret);

  await pool.query("UPDATE users SET two_factor_secret = ?, two_factor_enabled = 0 WHERE id = ?", [
    secret,
    user.id,
  ]);

  res.json({
    otpauthUrl,
    secret,
  });
}

export async function confirmTwoFactor(req: Request, res: Response) {
  const parsed = twoFaConfirmSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new HttpError("Invalid 2FA confirmation payload", 400);
  }

  const { email, token } = parsed.data;

  const [rows] = await pool.query<UserRow[]>(
    "SELECT id, email, two_factor_secret FROM users WHERE email = ? LIMIT 1",
    [email],
  );

  const user = rows[0];

  if (!user || !user.two_factor_secret) {
    throw new HttpError("2FA is not configured for this account", 400);
  }

  const isValid = authenticator.check(token, user.two_factor_secret);

  if (!isValid) {
    throw new HttpError("Invalid 2FA code", 401);
  }

  await pool.query("UPDATE users SET two_factor_enabled = 1 WHERE id = ?", [user.id]);

  res.json({ message: "2FA has been enabled for this account." });
}

