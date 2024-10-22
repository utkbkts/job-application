import { z } from "zod";

const requiredString = z
  .string()
  .min(1, "zorunlu alan")
  .regex(/^[a-zA-Z0-9çÇğĞüÜıİoOöÖşŞpP#@\s.,+'”:“”"/-]+$/, {
    message: "geçersiz karakter",
  });
export const locationTypes = ["Remote", "On-site", "Hybrid"];

const locationSchema = z.object({
  locationType: requiredString.refine(
    (value) => locationTypes.includes(value),
    "geçersiz konum tipi"
  ),
  location: z.string().max(100).optional(),
});
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
const requirementsSchema = z.array(
  z.string().min(1, { message: "Gereksinimler zorunludur" })
);

export const JobSchema = z
  .object({
    title: requiredString.max(100),
    companyName: requiredString.max(100),
    companyLogo: z.string(),
    experienceLevel: requiredString.max(100),
    experience: requiredString.max(100),
    description: z.string().max(5000),
    requirements: requirementsSchema,
    location: z.string().min(1, { message: "konum alanı zorunludur" }),
    jobType: z.string().min(1, { message: "iş tipi alanı zorunludur" }),
    salary: requiredString.max(30, "30 karakter en fazla"),
  })
  .and(applicationSchema)
  .and(locationSchema);
