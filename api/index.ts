import express, { type Request, Response, NextFunction } from "express";
import serverless from "serverless-http";
import { registerRoutes } from "./helpers/routes.js";
import { setupVite, serveStatic, log } from "./helpers/vite.js";
import cors from "cors";

const app = express();

// ✅ Middleware untuk parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Middleware CORS (penting!)
app.use(
  cors({
    origin: [
      "https://zenatalesv3-production.up.railway.app", // domain production kamu
      "http://localhost:5174",                          // dev lokal
      "capacitor://localhost",                          // Android/iOS WebView
      "http://localhost",                               // fallback
    ],
    methods: ["GET", "POST", "OPTIONS"], // pastikan OPTIONS disertakan
    allowedHeaders: ["Content-Type"],    // penting untuk JSON
    credentials: true                    // jika kamu kirim cookie/token
  })
);

// ✅ Tambahkan handler untuk preflight (OPTIONS) — WAJIB untuk CORS sukses
app.options("*", cors());

// ✅ Middleware untuk logging API dan response JSON-nya
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

const isServerless = !!process.env.VERCEL;

(async () => {
  try {
    const server = await registerRoutes(app);

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    if (!isServerless) {
      const port = process.env.PORT || 5000;
      server.listen(
        {
          port,
          host: "0.0.0.0",
          reusePort: true,
        },
        () => {
          log(`🚀 Server berjalan di port ${port} (env: ${process.env.NODE_ENV || "undefined"})`);
        }
      );
    } else {
      log("⚡ Running in serverless mode, no direct listen()");
    }
  } catch (error) {
    console.error("🔥 Server failed to start:");
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  }
})();

export const handler = serverless(app);
