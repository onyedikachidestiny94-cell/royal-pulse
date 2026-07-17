import { Router } from "express";
import { UploadImageBody } from "@workspace/api-zod";

const router = Router();

// POST /upload
router.post("/upload", async (req, res): Promise<void> => {
  const parsed = UploadImageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  res.json({ url: parsed.data.imageUrl });
});

export default router;
