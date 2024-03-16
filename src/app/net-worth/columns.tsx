"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Badge } from "@/components/ui/badge";
import type { NetWorth } from "@/lib/schema";
import { motion } from "framer-motion";
import { formatCurrencyToRM } from "@/lib/utils";
import {
  getColorByNetWorthCategory,
  getColorByNetWorthLiquidity,
  type netWorthCategory,
  type netWorthLiquidity,
} from "@/lib/dicts";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<NetWorth>[] = [
  {
    accessorKey: "item",
    header: () => <div className="text-left">Item</div>,
    cell: ({ row }) => {
      const isMobile = useMediaQuery("(max-width: 640px)");

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
            <div>
              <span className="mr-1">
                <CategoryBadge
                  category={row.getValue("category") as netWorthCategory}
                />
              </span>
              <span>
                <LiquidityBadge
                  liquidity={row.getValue("liquidity") as netWorthLiquidity}
                />
              </span>
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            {row.getValue("remarks")}
          </div>
        </motion.div>
      );
    },
  },
  {
    accessorKey: "remarks",
    header: () => <div>Remarks</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("remarks")}</div>;
    },
  },
  {
    accessorKey: "category",
    header: () => <div>Category</div>,
    cell: ({ row }) => {
      const category = row.getValue("category");

      return <CategoryBadge category={category as netWorthCategory} />;
    },
  },
  {
    accessorKey: "liquidity",
    header: () => <div>Liquidity</div>,
    cell: ({ row }) => {
      const liquidity = row.getValue("liquidity");

      return <LiquidityBadge liquidity={liquidity as netWorthLiquidity} />;
    },
  },
  {
    accessorKey: "currency",
    header: () => <div>Currency</div>,
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const currency = row.getValue("currency") as string;

      return (
        <Badge className="px-1 py-0 font-normal text-badgecontent">
          {currency}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount (RM)</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      return (
        <div className={`text-nowrap text-right font-semibold`}>
          {formatCurrencyToRM(amount)}
        </div>
      );
    },
  },
];

const CategoryBadge = ({ category }: { category: netWorthCategory }) => {
  return (
    <Badge
      className={`bg-[${getColorByNetWorthCategory(
        category,
      )}] px-1 py-0 font-normal text-badgecontent`}
    >
      {category}
    </Badge>
  );
};

const LiquidityBadge = ({ liquidity }: { liquidity: netWorthLiquidity }) => {
  return (
    <Badge
      className={`bg-[${getColorByNetWorthLiquidity(
        liquidity,
      )}] px-1 py-0 font-normal text-badgecontent`}
    >
      {liquidity}
    </Badge>
  );
};
