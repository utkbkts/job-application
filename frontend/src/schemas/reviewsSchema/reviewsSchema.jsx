import { z } from "zod";

const requiredString = z
  .string({ required_error: "zorunlu alan" })
  .min(1, "zorunlu alan")
  .regex(/^[a-zA-Z0-9çÇğĞüÜıİoOöÖşŞpP#@\s.,+'”:“”"/-]+$/, {
    message: "geçersiz karakter",
  });

export const reviewsSchema = z.object({
  comment: requiredString,
  rating: z
    .number({ required_error: "zorunlu alan" })
    .min(1, { message: "En az 1 yıldız verilmelidir" })
    .max(5, { message: "En fazla 5 yıldız verilebilir" }),
});
