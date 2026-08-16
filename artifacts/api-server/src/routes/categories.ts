import { Router } from "express";
import { eq, sql } from "drizzle-orm";
import { db, articlesTable } from "@workspace/db";

const router = Router();

const CATEGORIES = [
  { id: 1, name: "News", slug: "news" },
  { id: 2, name: "Breaking News", slug: "breaking-news" },
  { id: 3, name: "Politics", slug: "politics" },
  { id: 4, name: "Entertainment", slug: "entertainment" },
  { id: 5, name: "Sports", slug: "sports" },
  { id: 6, name: "Business", slug: "business" },
  { id: 7, name: "Technology", slug: "technology" },
  { id: 8, name: "World", slug: "world" },
  { id: 9, name: "Lifestyle", slug: "lifestyle" },
  { id: 10, name: "Metro", slug: "metro" },
  { id: 11, name: "Opinion", slug: "opinion" },
  { id: 12, name: "Local", slug: "local" },
];

// GET /categories
router.get("/categories", async (req, res): Promise<void> => {
  const counts = await db
    .select({
      category: articlesTable.category,
      count: sql<number>`count(*)`,
    })
    .from(articlesTable)
    .where(eq(articlesTable.status, "published"))
    .groupBy(articlesTable.category);

  const countMap = new Map(
    counts.map((r) => [r.category.toLowerCase(), Number(r.count)])
  );

  const categories = CATEGORIES.map((cat) => ({
    ...cat,
    articleCount: countMap.get(cat.name.toLowerCase()) ?? 0,
  }));

  res.json(categories);
});

export default router;
