import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const databaseUrl = process.env.DATABASE_URL;
const migrationUrl = /supabase\.com|pooler\.supabase\.com/i.test(databaseUrl)
  ? `${databaseUrl}${databaseUrl.includes("?") ? "&" : "?"}sslmode=require`
  : databaseUrl;

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: migrationUrl,
  },
});
