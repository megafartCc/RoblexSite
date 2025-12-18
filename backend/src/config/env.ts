import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(8080),
  API_BASE_PATH: z
    .string()
    .min(1)
    .transform((value) => (value.startsWith("/") ? value : `/${value}`))
    .default("/api"),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().min(1).max(65535).default(3306),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_POOL_SIZE: z.coerce.number().int().min(1).max(50).default(10),
  JWT_SECRET: z.string().min(16),
});

export const env = envSchema.parse(process.env);
