import { z } from "zod";

const namePattern = /^[a-zA-ZçÇğĞıİöÖşŞüÜ0-9\s?.,();:]*$/;

export const ProfileSchema = z.object({
  fullname: z
    .string()
    .min(1, { message: "İsim alanı zorunludur" })
    .max(200, { message: "En fazla 200 karakter girebilirsin" })
    .regex(namePattern, { message: "Geçersiz karakterler kullanıldı" })
    .optional(),
  email: z
    .string()
    .email({ message: "Geçerli bir email girin" })
    .min(1, { message: "Email alanı zorunludur" })
    .max(200, { message: "En fazla 200 karakter girebilirsin" })
    .optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{11}$/, {
      message:
        "11 haneli telefon numarası zorunlu başında 0 olacak şekilde giriniz.",
    })
    .optional(),
  bio: z
    .string()
    .min(1, { message: "Bio alanı zorunludur" }) // Zorunlu hale getirdik
    .regex(namePattern, { message: "Geçersiz karakterler kullanıldı" })
    .optional(),
  skills: z
    .string()
    .min(1, { message: "Beceriler alanı zorunludur" }) // Zorunlu hale getirdik
    .regex(namePattern, { message: "Geçersiz karakterler kullanıldı" })
    .optional(),
});
