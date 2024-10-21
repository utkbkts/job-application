import { z } from "zod";

const namePattern = /^[a-zA-ZçÇğĞıİöÖşŞüÜ0-9\s?.,();:]*$/;

export const RegisterSchema = z
  .object({
    fullname: z
      .string()
      .min(1, { message: "İsim alanı zorunludur" })
      .max(200, { message: "En fazla 200 karakter girebilirsin" })
      .regex(namePattern, { message: "Geçersiz karakterler kullanıldı" }),
    email: z
      .string()
      .email({ message: "Geçerli bir email girin" })
      .min(1, { message: "Email alanı zorunludur" })
      .max(200, { message: "En fazla 200 karakter girebilirsin" }),
    password: z
      .string()
      .min(6, { message: "Parola en az 6 karakter olmalıdır" })
      .max(200, { message: "En fazla 200 karakter girebilirsin" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Parola tekrarı zorunludur" })
      .max(200, { message: "En fazla 200 karakter girebilirsin" }),
    phoneNumber: z.string().regex(/^\d{11}$/, {
      message:
        "11 haneli telefon numarası zorunlu başında 0 olacak şekilde giriniz.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Parolalar eşleşmiyor",
  });
