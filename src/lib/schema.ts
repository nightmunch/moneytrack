import { z } from "zod";

export const claimFormSchema = z.object({
  item: z.string().min(2, {
    message: "Item name must be at least 2 characters",
  }),
  amount: z.number({
    invalid_type_error: "Amount must be a number",
    required_error: "Amount is required",
  }),
  date: z.date({
    invalid_type_error: "Date must be a valid date",
    required_error: "Date is required",
  }),
});
