import { transactionSchema } from "./transaction.schema";
import { z } from "zod/v4";

export const EditTransactionSchema = transactionSchema
  .extend({
    name: z.string().max(100, "Name must not exceed 100 characters").optional(),
  })
  .omit({ amount: true });

export type EditTransactionSchemaType = z.infer<typeof EditTransactionSchema>;
