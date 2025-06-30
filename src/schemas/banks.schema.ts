import { z } from "zod/v4";

export const addBankSchema = z.object({
  bankName: z
    .string()
    .min(2, "Bank name must be at least 2 characters")
    .max(50, "Bank name must be at most 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Bank name must contain only letters and spaces"),

  file: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        !file || ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      {
        message: "File must be a PNG or JPG",
      }
    )
    .refine((file) => !file || file.size <= 1024 * 1024, {
      message: "File size must be less than or equal to 1MB",
    }),
});

export type addBankSchemaTypes = z.infer<typeof addBankSchema>;
