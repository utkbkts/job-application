import { locationTypes } from "@/lib/utils";
import { z } from "zod";
const requiredString = z
  .string({ required_error: "zorunlu alan" })
  .min(1, "zorunlu alan")
  .regex(/^[a-zA-Z0-9çÇğĞüÜıİoOöÖşŞpP#@\s.,+'”:“”"/-]+$/, {
    message: "geçersiz karakter",
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "geçersiz konum tipi"
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "yerinde yapılacak işler için lokasyon gereklidir.",
      path: ["location"],
    }
  );
const applicationSchema = z
  .object({
    applicationEmail: requiredString
      .max(100)
      .email({ message: "zorunlu alan" })
      .optional()
      .or(z.literal("")),
    applicationUrl: requiredString
      .max(100)
      .url({ message: "zorunlu alan" })
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email ya da url zorunlu alan",
    path: ["applicationEmail"],
  });
const requirementsSchema = z
  .string({ required_error: "zorunlu alan" })
  .min(1, { message: "Gereksinimler zorunludur" })
  .transform((value) => value.split(",").map((item) => item.trim()));

const createSchema = z
  .object({
    title: requiredString.max(100, "100 karakter en fazla"),
    companyName: requiredString.max(100, "100 karakter en fazla"),
    companyLogo: z.string(),
    experienceLevel: requiredString.max(100, "100 karakter en fazla"),
    experience: requiredString.max(100, "100 karakter en fazla"),
    description: z.string({ required_error: "zorunlu alan" }).max(5000),
    requirements: requirementsSchema,
    location: z.string().min(1, { message: "konum alanı zorunludur" }),
    jobType: z.string().min(1, { message: "iş tipi alanı zorunludur" }),
    salary: requiredString.max(30, "30 karakter en fazla"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export default createSchema;
