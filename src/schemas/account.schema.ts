import { z } from "zod/v4";
const fileSizeLimit = 1024 * 1024;

export const addAccountSchema = z.object({
  accountName: z
    .string()
    .min(2, "Account name must be at least 2 characters")
    .max(50, "Account name must be at most 50 characters")
    .regex(
      /^[A-Za-z\s]+$/,
      "Account name must contain only letters and spaces",
    ),

  file: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        !file || ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      {
        message: "File must be a PNG or JPG",
      },
    )
    .refine((file) => !file || file.size <= fileSizeLimit, {
      message: "File size must be less than or equal to 1MB",
    }),
});

export type addAccountSchemaTypes = z.infer<typeof addAccountSchema>;
