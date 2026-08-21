import app from "./app";
import { logger } from "./lib/logger";
import { pool } from "@workspace/db";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function ensureArticleStore(): Promise<void> {
  await pool.query(`
    DO $$ BEGIN
      CREATE TYPE article_status AS ENUM ('draft', 'published');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL,
      author TEXT NOT NULL,
      image_url TEXT,
      status article_status NOT NULL DEFAULT 'draft',
      is_featured BOOLEAN NOT NULL DEFAULT false,
      is_breaking BOOLEAN NOT NULL DEFAULT false,
      views INTEGER NOT NULL DEFAULT 0,
      read_time INTEGER,
      published_at TIMESTAMP DEFAULT now(),
      created_at TIMESTAMP NOT NULL DEFAULT now(),
      updated_at TIMESTAMP NOT NULL DEFAULT now()
    );

    ALTER TABLE articles ADD COLUMN IF NOT EXISTS excerpt TEXT NOT NULL DEFAULT '';
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS image_url TEXT;
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS status article_status NOT NULL DEFAULT 'draft';
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false;
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS is_breaking BOOLEAN NOT NULL DEFAULT false;
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS views INTEGER NOT NULL DEFAULT 0;
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS read_time INTEGER;
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS published_at TIMESTAMP DEFAULT now();
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT now();
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT now();

    INSERT INTO articles (title, slug, content, excerpt, category, author, image_url, status, is_featured, read_time)
    VALUES
      ('Governor of Enugu State Unveils ₦50 Billion Infrastructure Plan', 'governor-enugu-50-billion-infrastructure-plan', 'The Governor of Enugu State has unveiled an ambitious infrastructure development plan aimed at transforming roads, healthcare facilities, and educational institutions.', 'Governor Peter Mbah announces a ₦50 billion plan to upgrade roads, hospitals, and schools across Enugu State.', 'Politics', 'Chukwuemeka Royal Pulse', 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200', 'published', true, 4),
      ('Burna Boy Announces Coal City Nights Concert in Enugu', 'burna-boy-coal-city-nights-enugu', 'Burna Boy has announced a major Enugu concert at the Nnamdi Azikiwe Stadium this December.', 'Burna Boy announces a major Enugu concert at the Nnamdi Azikiwe Stadium this December.', 'Entertainment', 'Adaeze Nwosu', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200', 'published', false, 3),
      ('CBN Raises Interest Rate to 27.5% to Combat Inflation', 'cbn-raises-interest-rate-27-5-percent', 'The Central Bank of Nigeria has raised the benchmark interest rate as it battles persistent inflation and works to restore price stability.', 'The CBN raises interest rates as it battles persistent inflation.', 'Business', 'Kelechi Ugwu', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200', 'published', false, 4)
    ON CONFLICT (slug) DO NOTHING;
  `);
}

async function start(): Promise<void> {
  await ensureArticleStore();
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
}

start().catch((err) => {
  logger.error({ err }, "Database initialization failed");
  process.exit(1);
});
