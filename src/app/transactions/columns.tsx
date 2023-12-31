"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { type Category, getColorByCategory } from "@/lib/dicts";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string;
  item: string;
  amount: number;
  category: Category;
  date: Date;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "item",
    header: () => <div className="text-left">Item</div>,
    cell: ({ row }) => {
      const isMobile = useMediaQuery("(max-width: 640px)");
      const category = row.getValue("category");
      const date = new Date(row.getValue("date"));

      return (
        <div className="flex flex-col gap-1">
          <div>{row.getValue("item")}</div>
          {isMobile && (
            <>
              <div>
                <CategoryBadge category={category as Category} />
              </div>
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
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => {
      const category = row.getValue("category");
      return <CategoryBadge category={category as Category} />;
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
        <div className="text-right font-semibold text-destructive">
          -{formattedWithCustomCurrency}
        </div>
      );
    },
    footer: ({ table }) => {
      const filteredRows = table.getFilteredRowModel().rows;
      let total = 0;

      filteredRows.forEach((row) => {
        total += parseFloat(row.getValue("amount"));
      });

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MYR",
      })
        .format(total)
        .replace("MYR", "RM");

      return (
        <div className="text-right font-bold">
          Total: <span className="text-destructive">-{formatted}</span>
        </div>
      );
    },
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

const CategoryBadge = ({ category }: { category: Category }) => {
  return (
    <Badge
      className={`bg-[${getColorByCategory(
        category,
      )}] px-1 py-0 text-badgecontent`}
    >
      {category}
    </Badge>
  );
};
