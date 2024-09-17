"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/features/shared/table/data-table-column-header";

export type Claim = {
	id: string;
	item: string;
	amount: number;
	date: string;
};

export const columns: ColumnDef<Claim>[] = [
	{
		accessorKey: "item",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Item" />
		),
	},
	{
		accessorKey: "amount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Amount" />
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "MYR",
			}).format(amount);
			return (
				<div className="text-right font-medium">
					{formatted.replace("MYR", "RM")}
				</div>
			);
		},
	},
	{
		accessorKey: "date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
	},
];
