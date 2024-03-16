"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  netWorthUpdateAtom,
  netWorthUpdateDrawerHandlerAtom,
} from "@/lib/atoms";
import { useSetAtom } from "jotai";
import type { NetWorth } from "@/lib/schema";
import { AnimatePresence } from "framer-motion";

interface DataTableProps<TValue> {
  columns: ColumnDef<NetWorth, TValue>[];
  data: NetWorth[];
  cryptoPrice: number;
}

export function DataTable<TValue>({
  columns,
  data,
  cryptoPrice,
}: DataTableProps<TValue>) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    currency: !isMobile,
    category: !isMobile,
    remarks: false,
    liquidity: !isMobile,
  });

  useEffect(() => {
    setColumnVisibility({
      currency: !isMobile,
      category: !isMobile,
      remarks: false,
      liquidity: !isMobile,
    });
  }, [isMobile]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  const setNetWorthUpdate = useSetAtom(netWorthUpdateAtom);
  const setOpenDrawer = useSetAtom(netWorthUpdateDrawerHandlerAtom);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.original.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      setNetWorthUpdate(
                        row.original.currency !== "RM"
                          ? {
                              ...row.original,
                              amount: row.original.amount / cryptoPrice,
                            }
                          : row.original,
                      );
                      setOpenDrawer(true);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
          {/* <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-right"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter> */}
        </Table>
      </div>
    </>
  );
}
