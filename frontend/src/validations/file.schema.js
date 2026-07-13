import { z } from "zod";

export const editFileSchema = z.object({
  originalName: z
    .string()
    .trim()
    .min(3, "Filename must be at least 3 characters")
    .max(100, "Filename is too long")
    .regex(
      /^[a-zA-Z0-9._ -]+$/,
      "Only letters, numbers, spaces, dots, hyphens and underscores are allowed"
    ),
});