import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export type TCategory = z.infer<typeof categorySchema>;

export default categorySchema;
