"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { useMediaQuery } from "@/hooks/useMediaQuery";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Claim = {
  id: string;
  item: string;
  amount: number;
  date: Date;
};

export const columns: ColumnDef<Claim>[] = [
  {
    accessorKey: "item",
    header: () => <div className="text-left">Item</div>,
    cell: ({ row }) => {
      const isMobile = useMediaQuery("(max-width: 640px)");
      const date = new Date(row.getValue("date"));

      return (
        <div className="flex flex-col gap-1">
          <div>{row.getValue("item")}</div>
          {isMobile && (
            <>
              <p className="text-xs text-muted-foreground">
                {format(date, "dd MMM yyyy")}
              </p>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MYR",
      }).format(amount);
      const formattedWithCustomCurrency = formatted.replace("MYR", "RM");

      return (
        <div className="text-right font-semibold">
          {formattedWithCustomCurrency}
        </div>
      );
    },
    footer: ({ table }) =>
      table
        .getFilteredRowModel()
        .rows.reduce(
          (total, row) => total + parseFloat(row.getValue("amount")),
          0,
        ),
  },
  {
    accessorKey: "date",
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <div className="text-right">{format(date, "dd/MM/yyyy")}</div>;
    },
  },
];
