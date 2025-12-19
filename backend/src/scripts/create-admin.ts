import bcrypt from "bcryptjs";
import { pool } from "../db/pool.js";

async function main() {
  const email = "da208412@gmail.com";
  const plainPassword = "BHnZNMD";

  const passwordHash = await bcrypt.hash(plainPassword, 12);

  await pool.query(
    `INSERT INTO users (email, password_hash, role)
     VALUES (?, ?, 'admin')
     ON DUPLICATE KEY UPDATE role = 'admin', password_hash = VALUES(password_hash)`,
    [email, passwordHash],
  );

  console.log("Admin ensured:", email);
  process.exit(0);
}

main().catch((error) => {
  console.error("Failed to create admin:", error);
  process.exit(1);
});

