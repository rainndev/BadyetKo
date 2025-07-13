import { z } from "zod/v4";

export const transactionSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  amount: z
    .string()
    .trim()
    .min(1, "Amount is required")
    .refine((val) => /^[0-9,.]+$/.test(val), {
      message: "Amount must only contain digits, commas, or periods",
    })
    .refine((val) => !isNaN(Number(val.replace(/,/g, ""))), {
      message: "Amount must be a valid number",
    })
    .transform((val) => Number(val.replace(/,/g, "")))
    .refine((val) => val > 0, {
      message: "Amount must be greater than 0",
    })
    .refine((val) => val <= 10_000_000_000, {
      message: "Amount must not exceed ₱10 billion",
    }),


    note: z
    .string()
    .max(100, "Note must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
    
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
