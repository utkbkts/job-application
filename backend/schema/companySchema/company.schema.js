import { z } from "zod";

const namePattern = /^[a-zA-ZçÇğĞıİöÖşŞüÜ0-9\s?.,();:]*$/;

export const CompanySchema = z.object({
  name: z
    .string()
    .min(1, { message: "İsim alanı zorunludur" })
    .max(200, { message: "En fazla 200 karakter girebilirsin" })
    .regex(namePattern, { message: "Geçersiz karakterler kullanıldı" }),
});
