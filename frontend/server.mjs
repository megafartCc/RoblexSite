import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stat, readFile } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, "dist");
const port = Number.parseInt(process.env.PORT ?? "3000", 10);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".ttf", "font/ttf"],
  [".map", "application/json; charset=utf-8"],
]);

function setCachingHeaders(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") {
    res.setHeader("Cache-Control", "no-cache");
    return;
  }
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes.get(ext) ?? "application/octet-stream";
}

function resolveRequestPath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0] ?? "/");
  const normalized = cleanPath.replace(/^\/+/, "");
  const absolute = path.join(distDir, normalized);

  if (!absolute.startsWith(distDir)) {
    return null;
  }

  return absolute;
}

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = req.url ?? "/";
    let filePath = resolveRequestPath(urlPath);
    if (!filePath) {
      res.statusCode = 403;
      res.end("Forbidden");
      return;
    }

    if (urlPath === "/" || urlPath === "") {
      filePath = path.join(distDir, "index.html");
    }

    try {
      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      const body = await readFile(filePath);
      res.statusCode = 200;
      res.setHeader("Content-Type", contentTypeFor(filePath));
      setCachingHeaders(res, filePath);
      res.end(body);
      return;
    } catch {
      // Fall through to SPA fallback.
    }

    const indexPath = path.join(distDir, "index.html");
    const indexBody = await readFile(indexPath);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.end(indexBody);
  } catch (err) {
    console.error("[frontend] request error", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`[frontend] serving ${distDir} on :${port}`);
});

