"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Badge } from "@/components/ui/badge";
import type { Claim } from "@/lib/schema";
import { motion } from "framer-motion";
import { formatCurrencyToRM } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Claim>[] = [
  {
    accessorKey: "item",
    header: () => <div className="text-left">Item</div>,
    cell: ({ row }) => {
      const isMobile = useMediaQuery("(max-width: 640px)");
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
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = formatCurrencyToRM(amount);

      return (
        <div className={`text-nowrap text-right font-semibold`}>
          {formatted}
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
          Total <Badge className="px-1 py-0 text-badgecontent">Unclaimed</Badge>
          {" : "}
          <span>{formatted}</span>
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
