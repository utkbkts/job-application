import { z } from "zod";

const namePattern = /^[a-zA-ZçÇğĞıİöÖşŞüÜ0-9\s?.,();:-]*$/;

export const JobSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Başlık alanı zorunludur" })
    .max(100, { message: "En fazla 100 karakter girebilirsin" })
    .regex(namePattern, { message: "Başlık geçersiz karakterler içeriyor" }),

  description: z
    .string()
    .min(1, { message: "Açıklama alanı zorunludur" })
    .regex(namePattern, { message: "Açıklama geçersiz karakterler içeriyor" }),

  requirements: z.array(
    z.string().regex(namePattern, {
      message: "Gereksinimler geçersiz karakterler içeriyor",
    })
  ),

  salary: z.string().min(1, { message: "Maaş sıfırdan büyük olmalıdır" }),

  location: z
    .string()
    .min(1, { message: "Konum alanı zorunludur" })
    .regex(namePattern, { message: "Konum geçersiz karakterler içeriyor" }),

  jobType: z
    .string()
    .min(1, { message: "İş türü alanı zorunludur" })
    .regex(namePattern, { message: "İş türü geçersiz karakterler içeriyor" }),

  experience: z
    .string()
    .min(1, { message: "Deneyim seviyesi alanı zorunludur" })
    .regex(namePattern, {
      message: "Deneyim seviyesi geçersiz karakterler içeriyor",
    }),

  position: z
    .string()
    .min(1, { message: "Pozisyon alanı zorunludur" })
    .regex(namePattern, { message: "Pozisyon geçersiz karakterler içeriyor" }),
});
