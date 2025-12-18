import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { initDatabase } from "./db/init.js";

async function start() {
  try {
    await initDatabase();
    console.log("Database connected and tables ensured.");

    const app = createApp();
    const port = env.PORT;

    app.listen(port, () => {
      console.log(`API ready on http://localhost:${port}${env.API_BASE_PATH}`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

start();
