import express, { type Request, Response, NextFunction } from "express";
import serverless from "serverless-http";
import { registerRoutes } from "./helpers/routes.js";
import { setupVite, serveStatic, log } from "./helpers/vite.js"
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    'http://localhost:5174' // Port client lokal
  ],
  methods: ['GET', 'POST']
}));

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

(async () => {
  try {
    const server = await registerRoutes(app);

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    if (process.env.NODE_ENV === "development") {
      const port = 5000;
      server.listen(
        {
          port,
          host: "0.0.0.0",
          reusePort: true,
        },
        () => {
          log(`🚀 Server lokal berjalan di port ${port}`);
        }
      );
    } else {
      console.log("🚀 Server tidak berjalan karena bukan mode development");
    }
    
  } catch (error) {
    console.error("🔥 Server failed to start:");
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1); // exit with error code
  }
})();

// Export handler untuk Vercel
export const handler = serverless(app);
