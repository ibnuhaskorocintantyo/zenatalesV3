import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { cartographer } from "@replit/vite-plugin-cartographer";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async () => {
  const isReplitEnv = process.env.REPL_ID && process.env.NODE_ENV !== "production";

  return {
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...(isReplitEnv ? [cartographer()] : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@shared": path.resolve(__dirname, "../shared"),
        "@assets": path.resolve(__dirname, "../attached_assets"),
      }
    },
    root: path.resolve(__dirname, "./"),
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html")
        }
      }
    },
    server: {
      port: 5174,
      strictPort: true
    },
    optimizeDeps: {
      esbuildOptions: {
        tsconfig: "./tsconfig.json"
      }
    }
  };
});
