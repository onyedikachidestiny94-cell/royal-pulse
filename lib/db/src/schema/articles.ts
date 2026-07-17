import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const articleStatusEnum = pgEnum("article_status", [
  "draft",
  "published",
]);

export const articlesTable = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  imageUrl: text("image_url"),
  status: articleStatusEnum("status").notNull().default("draft"),
  isFeatured: boolean("is_featured").notNull().default(false),
  isBreaking: boolean("is_breaking").notNull().default(false),
  views: integer("views").notNull().default(0),
  readTime: integer("read_time"),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertArticleSchema = createInsertSchema(articlesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articlesTable.$inferSelect;
