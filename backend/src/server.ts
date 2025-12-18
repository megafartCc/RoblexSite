import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();
const port = env.PORT;

app.listen(port, () => {
  console.log(`API ready on http://localhost:${port}${env.API_BASE_PATH}`);
});
