import * as React from "react";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

const Table = React.forwardRef<HTMLTableElement, HTMLMotionProps<"table">>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <motion.table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  HTMLMotionProps<"thead">
>(({ className, ...props }, ref) => (
  <motion.thead
    ref={ref}
    className={cn("[&_tr]:border-b", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  HTMLMotionProps<"tbody">
>(({ className, ...props }, ref) => (
  <motion.tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  HTMLMotionProps<"tfoot">
>(({ className, ...props }, ref) => (
  <motion.tfoot
    ref={ref}
    className={cn(
      "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, HTMLMotionProps<"tr">>(
  ({ className, ...props }, ref) => (
    <motion.tr
      initial={{ opacity: 0, lineHeight: 0, scaleY: 0 }}
      animate={{ opacity: 1, lineHeight: 1, scaleY: 1 }}
      exit={{ opacity: 0, lineHeight: 0, scaleY: 0 }}
      transition={{
        type: "tween",
        duration: 0.25,
      }}
      ref={ref}
      className={cn(
        "hover:bg-muted/50 table-row border-b data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, HTMLMotionProps<"th">>(
  ({ className, ...props }, ref) => (
    <motion.th
      ref={ref}
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, HTMLMotionProps<"td">>(
  ({ className, ...props }, ref) => (
    <motion.td
      initial={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
      exit={{ paddingTop: 0, paddingBottom: 0 }}
      transition={{
        type: "tween",
        duration: 0.25,
      }}
      ref={ref}
      className={cn(
        "px-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  HTMLMotionProps<"caption">
>(({ className, ...props }, ref) => (
  <motion.caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
