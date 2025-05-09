import express, { type Express } from "express";
import fs from "fs";
import { fileURLToPath } from 'url';
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import type { ServerOptions } from "vite";

// Fix untuk __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions: ServerOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    root: path.resolve(__dirname, '../../client'), 
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../client/src'), // Tambahkan ini
        '@shared': path.resolve(__dirname, '../../shared'),
        '@assets': path.resolve(__dirname, '../../attached_assets'),
      },
    },// Path yang diperbaiki
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "../../client/index.html"
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "../../client/dist"); // Path yang diperbaiki

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Build directory not found: ${distPath}\nRun 'npm run build' in client directory first`
    );
  }

  // Serve static assets
  app.use(express.static(distPath, {
    index: false, // Disable directory index
    maxAge: "1y", // Cache control
  }));

  // Fallback to index.html
  app.use("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}