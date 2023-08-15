import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().min(1, "Nama is Required"),
  street: z.string().min(1, "Jalan is Required"),
  address: z.string().min(1, "Alamat is Required"),
  description: z.string().min(12),
  category: z.string().min(1, "Kategori harus dipilih"),
  photos: z.unknown().refine((val) => {
    if (!Array.isArray(val)) return false;
    return !val.some((file) => !(file instanceof File));
  }, "must be an array of file"),
});

export type TLocation = z.infer<typeof locationSchema>;
