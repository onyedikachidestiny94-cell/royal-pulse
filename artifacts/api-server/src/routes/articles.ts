import { Router } from "express";
import { eq, desc, ilike, or, sql, and } from "drizzle-orm";
import { db, articlesTable } from "@workspace/db";
import {
  ListArticlesQueryParams,
  CreateArticleBody,
  CreateArticleResponse,
  GetArticleBySlugParams,
  IncrementArticleViewParams,
  ListAdminArticlesQueryParams,
  UpdateArticleParams,
  UpdateArticleBody,
  DeleteArticleParams,
} from "@workspace/api-zod";

const router = Router();

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function articleToDto(a: typeof articlesTable.$inferSelect) {
  return {
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
  };
}

// GET /articles
router.get("/articles", async (req, res): Promise<void> => {
  const query = ListArticlesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  const { category, search, page = 1, limit = 12 } = query.data;
  const offset = (page - 1) * limit;

  const conditions = [eq(articlesTable.status, "published")];
  if (category) conditions.push(eq(articlesTable.category, category));
  if (search) {
    conditions.push(
      or(
        ilike(articlesTable.title, `%${search}%`),
        ilike(articlesTable.excerpt, `%${search}%`)
      )!
    );
  }

  const where = and(...conditions);
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
    articles: articles.map(articleToDto),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

// POST /articles
router.post("/articles", async (req, res): Promise<void> => {
  const parsed = CreateArticleBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const baseSlug = slugify(data.title);
  let slug = baseSlug;
  // Ensure unique slug
  let attempt = 0;
  while (true) {
    const existing = await db
      .select({ id: articlesTable.id })
      .from(articlesTable)
      .where(eq(articlesTable.slug, slug))
      .limit(1);
    if (existing.length === 0) break;
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  const [article] = await db
    .insert(articlesTable)
    .values({
      title: data.title,
      slug,
      content: data.content,
      excerpt: data.excerpt,
      category: data.category,
      author: data.author,
      imageUrl: data.imageUrl,
      status: (data.status ?? "draft") as "draft" | "published",
      isFeatured: data.isFeatured ?? false,
      isBreaking: data.isBreaking ?? false,
      readTime: data.readTime,
      publishedAt: data.status === "published" ? new Date() : undefined,
    })
    .returning();

  const response = CreateArticleResponse.parse(articleToDto(article));
  res.status(201).json(response);
});

// GET /articles/featured
router.get("/articles/featured", async (req, res): Promise<void> => {
  const articles = await db
    .select()
    .from(articlesTable)
    .where(
      and(
        eq(articlesTable.status, "published"),
        eq(articlesTable.isFeatured, true)
      )
    )
    .orderBy(desc(articlesTable.publishedAt))
    .limit(5);
  res.json(articles.map(articleToDto));
});

// GET /articles/breaking
router.get("/articles/breaking", async (req, res): Promise<void> => {
  const articles = await db
    .select()
    .from(articlesTable)
    .where(
      and(
        eq(articlesTable.status, "published"),
        eq(articlesTable.isBreaking, true)
      )
    )
    .orderBy(desc(articlesTable.publishedAt))
    .limit(10);
  res.json(articles.map(articleToDto));
});

// GET /articles/trending
router.get("/articles/trending", async (req, res): Promise<void> => {
  const articles = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.status, "published"))
    .orderBy(desc(articlesTable.views))
    .limit(8);
  res.json(articles.map(articleToDto));
});

// GET /articles/popular
router.get("/articles/popular", async (req, res): Promise<void> => {
  const articles = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.status, "published"))
    .orderBy(desc(articlesTable.views))
    .limit(6);
  res.json(articles.map(articleToDto));
});

// GET /articles/stats
router.get("/articles/stats", async (req, res): Promise<void> => {
  const [totalResult, publishedResult, draftResult, viewsResult, breakingResult, featuredResult, categoryResult] =
    await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(articlesTable),
      db
        .select({ count: sql<number>`count(*)` })
        .from(articlesTable)
        .where(eq(articlesTable.status, "published")),
      db
        .select({ count: sql<number>`count(*)` })
        .from(articlesTable)
        .where(eq(articlesTable.status, "draft")),
      db.select({ total: sql<number>`sum(views)` }).from(articlesTable),
      db
        .select({ count: sql<number>`count(*)` })
        .from(articlesTable)
        .where(eq(articlesTable.isBreaking, true)),
      db
        .select({ count: sql<number>`count(*)` })
        .from(articlesTable)
        .where(eq(articlesTable.isFeatured, true)),
      db
        .select({
          category: articlesTable.category,
          count: sql<number>`count(*)`,
        })
        .from(articlesTable)
        .groupBy(articlesTable.category),
    ]);

  res.json({
    totalArticles: Number(totalResult[0]?.count ?? 0),
    publishedArticles: Number(publishedResult[0]?.count ?? 0),
    draftArticles: Number(draftResult[0]?.count ?? 0),
    totalViews: Number(viewsResult[0]?.total ?? 0),
    breakingCount: Number(breakingResult[0]?.count ?? 0),
    featuredCount: Number(featuredResult[0]?.count ?? 0),
    categoryBreakdown: categoryResult.map((r) => ({
      category: r.category,
      count: Number(r.count),
    })),
  });
});

// GET /articles/:slug — must come AFTER named routes above
router.get("/articles/:slug", async (req, res): Promise<void> => {
  const params = GetArticleBySlugParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const { slug } = params.data;

  const [article] = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.slug, slug))
    .limit(1);

  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  // Get related articles in same category
  const related = await db
    .select()
    .from(articlesTable)
    .where(
      and(
        eq(articlesTable.status, "published"),
        eq(articlesTable.category, article.category),
        sql`${articlesTable.id} != ${article.id}`
      )
    )
    .orderBy(desc(articlesTable.publishedAt))
    .limit(4);

  res.json({
    ...articleToDto(article),
    content: article.content,
    related: related.map(articleToDto),
  });
});

// POST /articles/:id/view
router.post("/articles/:id/view", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = IncrementArticleViewParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [updated] = await db
    .update(articlesTable)
    .set({ views: sql`${articlesTable.views} + 1` })
    .where(eq(articlesTable.id, params.data.id))
    .returning({ views: articlesTable.views });

  if (!updated) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  res.json({ views: updated.views });
});

// GET /admin/articles
router.get("/admin/articles", async (req, res): Promise<void> => {
  const query = ListAdminArticlesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  const { page = 1, limit = 20, status = "all" } = query.data;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (status !== "all") {
    conditions.push(eq(articlesTable.status, status as "draft" | "published"));
  }
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [articles, countResult] = await Promise.all([
    db
      .select()
      .from(articlesTable)
      .where(where)
      .orderBy(desc(articlesTable.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(articlesTable)
      .where(where),
  ]);

  const total = Number(countResult[0]?.count ?? 0);
  res.json({
    articles: articles.map(articleToDto),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

// PUT /admin/articles/:id
router.put("/admin/articles/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const params = UpdateArticleParams.safeParse({ id });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const body = UpdateArticleBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const updates: Partial<typeof articlesTable.$inferInsert> = {};
  if (body.data.title !== undefined) updates.title = body.data.title;
  if (body.data.content !== undefined) updates.content = body.data.content;
  if (body.data.excerpt !== undefined) updates.excerpt = body.data.excerpt;
  if (body.data.category !== undefined) updates.category = body.data.category;
  if (body.data.author !== undefined) updates.author = body.data.author;
  if (body.data.imageUrl !== undefined) updates.imageUrl = body.data.imageUrl;
  if (body.data.status !== undefined) {
    updates.status = body.data.status as "draft" | "published";
    if (body.data.status === "published") updates.publishedAt = new Date();
  }
  if (body.data.isFeatured !== undefined) updates.isFeatured = body.data.isFeatured;
  if (body.data.isBreaking !== undefined) updates.isBreaking = body.data.isBreaking;
  if (body.data.readTime !== undefined) updates.readTime = body.data.readTime;
  updates.updatedAt = new Date();

  const [updated] = await db
    .update(articlesTable)
    .set(updates)
    .where(eq(articlesTable.id, params.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  res.json(articleToDto(updated));
});

// DELETE /admin/articles/:id
router.delete("/admin/articles/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const params = DeleteArticleParams.safeParse({ id });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(articlesTable)
    .where(eq(articlesTable.id, params.data.id))
    .returning({ id: articlesTable.id });

  if (!deleted) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  res.json({ success: true });
});

export default router;
