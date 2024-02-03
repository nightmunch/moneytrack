"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { type Category, getColorByCategory } from "@/lib/dicts";
import { formatCurrencyToRM } from "@/lib/utils";

import type { Transaction } from "@/lib/schema";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "item",
    header: () => <div className="text-left">Item</div>,
    cell: ({ row }) => {
      const isMobile = useMediaQuery("(max-width: 640px)");
      const category = row.getValue("category");
      const date = new Date(row.getValue("date"));

      return (
        <motion.div
          initial={{ maxHeight: 100, scaleY: 1 }}
          exit={{ maxHeight: 0, scaleY: 0 }}
          transition={{
            type: "tween",
            duration: 0.25,
          }}
          className="flex flex-col gap-1"
        >
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
        </motion.div>
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
      const formatted = formatCurrencyToRM(amount);

      return (
        <div className="text-nowrap text-right font-semibold text-destructive">
          -{formatted}
        </div>
      );
    },
    footer: ({ table }) => {
      const filteredRows = table.getFilteredRowModel().rows;
      let total = 0;

      filteredRows.forEach((row) => {
        total += parseFloat(row.getValue("amount"));
      });

      const formatted = formatCurrencyToRM(total);

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
    filterFn: (row, id, value) => {
      // filter by month
      const date = new Date(row.getValue("date"));
      const month = date.getMonth();
      return month === (value as Date).getMonth();
    },
  },
  {
    accessorKey: "createdBy",
    header: () => <div className="text-center">Created By</div>,
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const user = row.getValue("createdBy") as { name: string; image: string };
      return (
        <div className="flex flex-col items-center">
          <Avatar className="sm:h-[1.5rem] sm:w-[1.5rem]">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      );
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
