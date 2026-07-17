import { Router } from "express";
import { eq, ilike, or, and, desc, sql } from "drizzle-orm";
import { db, articlesTable } from "@workspace/db";
import { SearchArticlesQueryParams } from "@workspace/api-zod";

const router = Router();

// GET /search
router.get("/search", async (req, res): Promise<void> => {
  const query = SearchArticlesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  const { q, page = 1, limit = 10 } = query.data;
  const offset = (page - 1) * limit;

  const where = and(
    eq(articlesTable.status, "published"),
    or(
      ilike(articlesTable.title, `%${q}%`),
      ilike(articlesTable.excerpt, `%${q}%`),
      ilike(articlesTable.content, `%${q}%`)
    )
  );

  const [articles, countResult] = await Promise.all([
    db
      .select()
      .from(articlesTable)
      .where(where)
      .orderBy(desc(articlesTable.publishedAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(articlesTable)
      .where(where),
  ]);

  const total = Number(countResult[0]?.count ?? 0);

  res.json({
    articles: articles.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      category: a.category,
      author: a.author,
      imageUrl: a.imageUrl,
      publishedAt: a.publishedAt?.toISOString() ?? new Date().toISOString(),
      views: a.views,
      status: a.status as "draft" | "published",
      isFeatured: a.isFeatured,
      isBreaking: a.isBreaking,
      readTime: a.readTime,
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

export default router;
