import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// ✅ Load .env dari root project (ZenatalesV/.env)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from "../../shared/schema"; 


// Konfigurasi WebSocket Neon
neonConfig.webSocketConstructor = ws;

// Cek DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set. Did you forget to create .env di root?');
}

// Inisialisasi Pool Neon
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// ✅ Inisialisasi Drizzle dengan parameter yang benar
export const db = drizzle(pool, { 
  schema, 
  logger: true  // Opsional: aktifkan logging query
});
