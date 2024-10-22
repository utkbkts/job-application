import { locationTypes } from "@/lib/utils";
import { z } from "zod";
const requiredString = z
  .string({ required_error: "zorunlu alan" })
  .min(1, "zorunlu alan")
  .regex(/^[a-zA-Z0-9çÇğĞüÜıİoOöÖşŞpP#@\s.,+'”:“”"/-]+$/, {
    message: "geçersiz karakter",
  })
  .optional();

export const createCompany = z.object({
  companyName: requiredString,
  description: requiredString,
  website: requiredString,
  location: requiredString,
  locationType: requiredString
    .refine((value) => locationTypes.includes(value), "geçersiz konum tipi")
    .optional(),
  logo: z.string().optional(),
});
