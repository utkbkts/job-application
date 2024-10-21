import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Geçerli bir email girin" })
    .min(1, { message: "Email alanı zorunludur" })
    .max(200, { message: "En fazla 200 karakter girebilirsin" }),
  password: z
    .string()
    .min(6, { message: "Parola en az 6 karakter olmalıdır" })
    .max(200, { message: "En fazla 200 karakter girebilirsin" }),
});
