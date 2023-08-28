import { z } from "zod";
import { asOptionalField } from "@/lib/validations/optional-string";
import validator from "validator";

export const locationSchema = z.object({
  name: z
    .string()
    .regex(
      new RegExp('^[^\\\\/?%*:|"<>]+$'),
      "Error: Invalid regex format for folder name validation."
    )
    .min(3)
    .max(50),
  description: z.string().min(12),
  address: z.string().min(1, "Alamat is Required"),
  category: z.string().min(1, "Kategori harus dipilih"),
  coordinate: z.unknown().refine((val) => typeof val === "object"),

  // contact field (optional field)
  whatsapp: asOptionalField(z.string()),
  website: asOptionalField(z.string().refine((val) => validator.isURL(val))),
  instagram: asOptionalField(z.string()),
  facebook: asOptionalField(z.string()),
});

export const addLocationSchema = locationSchema.extend({
  photos: z.unknown().refine((val) => {
    if (!Array.isArray(val)) return false;
    return !val.some((file) => !(file instanceof File));
  }, "must be an array of file"),
});

export const editLocationSchema = locationSchema.extend({
  photos: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false;
      return !val.some((file) => !(file instanceof File));
    }, "must be an array of file")
    .or(z.string().array()),
});

export type TLocation = z.infer<typeof locationSchema>;
export type TAddLocation = z.infer<typeof addLocationSchema>;
export type TEditLocation = z.infer<typeof editLocationSchema>;
