import { z } from "zod/v4";

export const transactionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a number",
    })
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Amount must be greater than 0",
    }),
  type: z.enum(["deposit", "withdraw"]),
  note: z.string().optional(),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
