import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const jobTypes = [
  "Tam-zamanlı",
  "Yarı-zamanlı",
  "Sözleşmeli",
  "Geçiçi",
  "Staj",
];
export const locationTypes = ["Remote", "On-site", "Hybrid"];
