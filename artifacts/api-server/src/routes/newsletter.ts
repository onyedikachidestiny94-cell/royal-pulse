import { Router } from "express";
import { db, newsletterTable } from "@workspace/db";
import { SubscribeNewsletterBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router = Router();

// POST /newsletter/subscribe
router.post("/newsletter/subscribe", async (req, res): Promise<void> => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const existing = await db
    .select({ id: newsletterTable.id })
    .from(newsletterTable)
    .where(eq(newsletterTable.email, parsed.data.email))
    .limit(1);

  if (existing.length > 0) {
    res.status(201).json({
      success: true,
      message: "You are already subscribed to Royal Pulse.",
    });
    return;
  }

  await db.insert(newsletterTable).values({
    email: parsed.data.email,
    name: parsed.data.name,
  });

  res.status(201).json({
    success: true,
    message: "Welcome to Royal Pulse! You have been successfully subscribed.",
  });
});

export default router;
