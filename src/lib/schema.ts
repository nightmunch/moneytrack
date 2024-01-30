import { z } from "zod";

// Claim Schema
export const claimFormSchema = z.object({
  id: z.number().optional(),
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

export type Claim = z.infer<typeof claimFormSchema>;

// Transaction Schema
export const transactionFormSchema = z.object({
  id: z.number().optional(),
  item: z.string().min(2, {
    message: "Item name must be at least 2 characters",
  }),
  amount: z.number({
    invalid_type_error: "Amount must be a number",
    required_error: "Amount is required",
  }),
  category: z.string({
    invalid_type_error: "Category must be a string",
    required_error: "Category is required",
  }),
  date: z.date({
    invalid_type_error: "Date must be a valid date",
    required_error: "Date is required",
  }),
});

export type Transaction = z.infer<typeof transactionFormSchema>;
