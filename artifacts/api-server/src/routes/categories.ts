import { Router } from "express";
import { eq, sql } from "drizzle-orm";
import { db, articlesTable } from "@workspace/db";

const router = Router();

const CATEGORIES = [
  { id: 1, name: "Breaking News", slug: "breaking-news" },
  { id: 2, name: "Politics", slug: "politics" },
  { id: 3, name: "Entertainment", slug: "entertainment" },
  { id: 4, name: "Sports", slug: "sports" },
  { id: 5, name: "Business", slug: "business" },
  { id: 6, name: "Technology", slug: "technology" },
  { id: 7, name: "World", slug: "world" },
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
