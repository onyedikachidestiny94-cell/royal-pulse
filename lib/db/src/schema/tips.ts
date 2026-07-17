import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const tipsTable = pgTable("news_tips", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  tipContent: text("tip_content").notNull(),
  status: text("status").notNull().default("new"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertTipSchema = createInsertSchema(tipsTable).omit({
  id: true,
  submittedAt: true,
});

export type InsertTip = z.infer<typeof insertTipSchema>;
export type Tip = typeof tipsTable.$inferSelect;
