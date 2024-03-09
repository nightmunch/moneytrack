"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type VisibilityState,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimatePresence } from "framer-motion";
import {
  transactionUpdateAtom,
  transactionUpdateDrawerHandlerAtom,
} from "@/lib/atoms";
import { useSetAtom } from "jotai";
import type { Transaction } from "@/lib/schema";
import React from "react";
import { MonthPicker } from "@/components/ui/month-picker";
import { NewTransactionDrawer } from "@/components/ui/transactions/new-transaction-drawer";
import { transactionMonthAtom } from "@/lib/atoms";

interface DataTableProps<TValue> {
  columns: ColumnDef<Transaction, TValue>[];
  data: Transaction[];
}

export function DataTable<TValue>({ columns, data }: DataTableProps<TValue>) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    category: !isMobile,
    date: !isMobile,
    createdBy: false,
  });

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    {
      id: "date",
      value: new Date(),
    },
  ]);

  useEffect(() => {
    setColumnVisibility({
      category: !isMobile,
      date: !isMobile,
      createdBy: false,
    });
  }, [isMobile]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnVisibility,
      columnFilters,
    },
  });

  const setTransactionUpdate = useSetAtom(transactionUpdateAtom);
  const setOpenDrawer = useSetAtom(transactionUpdateDrawerHandlerAtom);
  const setMonth = useSetAtom(transactionMonthAtom);

  return (
    <>
      <div className="flex gap-2">
        <MonthPicker
          className="grow"
          disabled={data.length === 0}
          date={
            data.length === 0
              ? undefined
              : (table.getState().columnFilters[0]?.value as Date)
          }
          setDate={(date) => {
            if (date) {
              setColumnFilters([{ id: "date", value: date }]);
              setMonth(date);
            } else {
              setColumnFilters([]);
              setMonth(null);
            }
          }}
        />
        <NewTransactionDrawer />
      </div>
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
                      console.log("Open");
                      setTransactionUpdate(row.original);
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
