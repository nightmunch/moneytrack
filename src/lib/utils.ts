import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyToRM(value: number) {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MYR",
  });
  return currencyFormatter.format(value).replace("MYR", "RM");
}
