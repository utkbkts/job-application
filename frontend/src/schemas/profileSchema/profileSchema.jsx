import { z } from "zod";
const requiredString = z
  .string({ required_error: "zorunlu alan" })
  .min(1, "zorunlu alan")
  .regex(/^[^<>"]*$/, {
    message: "geçersiz karakter",
  });

export const profileSchema = z.object({
  title: requiredString,
  description: requiredString,
  image: z.any(),
  githubLink: requiredString.max(100).url({ message: "zorunlu alan" }),
});
