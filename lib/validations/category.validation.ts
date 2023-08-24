import { z } from "zod";
import { asOptionalField } from "@/lib/validations/optional-string";

const categorySchema = z.object({
  name: z.string().min(3),
  description: asOptionalField(z.string()),
});

export type TCategory = z.infer<typeof categorySchema>;

export default categorySchema;
