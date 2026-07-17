import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, commentsTable } from "@workspace/db";
import {
  ListCommentsParams,
  CreateCommentParams,
  CreateCommentBody,
} from "@workspace/api-zod";

const router = Router();

// GET /articles/:articleId/comments
router.get(
  "/articles/:articleId/comments",
  async (req, res): Promise<void> => {
    const raw = Array.isArray(req.params.articleId)
      ? req.params.articleId[0]
      : req.params.articleId;
    const params = ListCommentsParams.safeParse({
      articleId: parseInt(raw, 10),
    });
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }

    const comments = await db
      .select()
      .from(commentsTable)
      .where(eq(commentsTable.articleId, params.data.articleId))
      .orderBy(desc(commentsTable.createdAt));

    res.json(
      comments.map((c) => ({
        id: c.id,
        articleId: c.articleId,
        authorName: c.authorName,
        authorEmail: c.authorEmail,
        content: c.content,
        createdAt: c.createdAt.toISOString(),
        approved: c.approved,
      }))
    );
  }
);

// POST /articles/:articleId/comments
router.post(
  "/articles/:articleId/comments",
  async (req, res): Promise<void> => {
    const raw = Array.isArray(req.params.articleId)
      ? req.params.articleId[0]
      : req.params.articleId;
    const params = CreateCommentParams.safeParse({
      articleId: parseInt(raw, 10),
    });
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }

    const body = CreateCommentBody.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }

    const [comment] = await db
      .insert(commentsTable)
      .values({
        articleId: params.data.articleId,
        authorName: body.data.authorName,
        authorEmail: body.data.authorEmail,
        content: body.data.content,
        approved: true,
      })
      .returning();

    res.status(201).json({
      id: comment.id,
      articleId: comment.articleId,
      authorName: comment.authorName,
      authorEmail: comment.authorEmail,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      approved: comment.approved,
    });
  }
);

export default router;
