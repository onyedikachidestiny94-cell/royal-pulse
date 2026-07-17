import { Router } from "express";
import { db, tipsTable } from "@workspace/db";
import { SubmitTipBody } from "@workspace/api-zod";

const router = Router();

// POST /tips
router.post("/tips", async (req, res): Promise<void> => {
  const parsed = SubmitTipBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.insert(tipsTable).values({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    tipContent: parsed.data.tipContent,
    status: "new",
  });

  res.status(201).json({
    success: true,
    message:
      "Thank you for your tip! Our editorial team will review it and get back to you.",
  });
});

export default router;
