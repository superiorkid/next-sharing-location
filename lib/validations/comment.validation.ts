import { z } from "zod";

export const commentSchema = z.object({
  comment: z.string().min(8),
});

export type TComment = z.infer<typeof commentSchema>;
