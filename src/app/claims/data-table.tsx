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
  TableFooter,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { claimUpdateAtom, claimUpdateDrawerHandlerAtom } from "@/lib/atoms";
import { useSetAtom } from "jotai";
import type { Claim } from "@/lib/schema";
import { AnimatePresence } from "framer-motion";

interface DataTableProps<TValue> {
  columns: ColumnDef<Claim, TValue>[];
  data: Claim[];
}

export function DataTable<TValue>({ columns, data }: DataTableProps<TValue>) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    status: !isMobile,
    date: !isMobile,
  });

  useEffect(() => {
    setColumnVisibility({
      status: !isMobile,
      date: !isMobile,
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

  const setClaimUpdate = useSetAtom(claimUpdateAtom);
  const setOpenDrawer = useSetAtom(claimUpdateDrawerHandlerAtom);

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
                      setClaimUpdate(row.original);
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
          <TableFooter>
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
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
