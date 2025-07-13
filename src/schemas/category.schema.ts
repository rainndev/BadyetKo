import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must not exceed 50 characters"),
})

export type categorySchemaType = z.infer<typeof categorySchema>;

