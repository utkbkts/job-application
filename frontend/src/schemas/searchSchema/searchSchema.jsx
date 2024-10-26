import { z } from "zod";

const requiredString = z
  .string({ required_error: "zorunlu alan" })
  .min(1, "zorunlu alan")
  .regex(/^[^<>"]*$/, {
    message: "geçersiz karakter",
  });

export const searchSchema = z.object({
  search: requiredString,
});
