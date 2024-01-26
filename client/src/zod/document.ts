import * as z from "zod";

const PreDocSchema = z.object({
  title: z.string(),
  emailID: z.string().email(),
  color: z.string(),
  pinned: z.boolean(),
  descImg: z.string().url(),
});

const DocumentSchema = PreDocSchema.extend({
  content: z.string(),
});

export type IPreDoc = z.infer<typeof PreDocSchema>;
export type IDocument = z.infer<typeof DocumentSchema>;
