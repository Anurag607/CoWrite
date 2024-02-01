import * as z from "zod";

const PreDocSchema = z.object({
  id: z.number(),
  title: z.string(),
  emailID: z.string().email(),
  color: z.string(),
  pinned: z.boolean(),
  descImg: z.string().url().optional(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const DocumentSchema = z.object({
  _id: z.string(),
  title: z.string(),
  owner: z.string().email(),
  access: z.string().array(),
  color: z.string(),
  pinned: z.boolean(),
  descImg: z.string().url().optional(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IPreDoc = z.infer<typeof PreDocSchema>;
export type RDocument = z.infer<typeof DocumentSchema>;
