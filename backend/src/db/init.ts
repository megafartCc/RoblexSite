import { pool } from "./pool.js";

export async function initDatabase() {
  // Ensure connection works and create required tables.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) NULL,
      two_factor_secret VARCHAR(255) NULL,
      two_factor_enabled TINYINT(1) NOT NULL DEFAULT 0,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  try {
    await pool.query(`ALTER TABLE users ADD COLUMN two_factor_secret VARCHAR(255) NULL`);
  } catch (error: any) {
    if (error?.code !== "ER_DUP_FIELDNAME") {
      throw error;
    }
  }

  try {
    await pool.query(
      `ALTER TABLE users ADD COLUMN two_factor_enabled TINYINT(1) NOT NULL DEFAULT 0`,
    );
  } catch (error: any) {
    if (error?.code !== "ER_DUP_FIELDNAME") {
      throw error;
    }
  }
}
