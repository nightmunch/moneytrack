"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { RefreshCw } from "lucide-react"; // Import the reset icon

// import { claims } from "./data";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	resetTable: () => void; // Add this prop
}

export function DataTableToolbar<TData>({
	table,
	resetTable,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;
	const isSorted = table.getState().sorting.length > 0;
	const isVisibilityChanged = Object.values(
		table.getState().columnVisibility
	).some((v) => !v);

	const showResetButton = isFiltered || isSorted || isVisibilityChanged;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter..."
					value={(table.getColumn("item")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("item")?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<div className="flex items-center space-x-2">
				{showResetButton && (
					<Button
						variant="outline"
						size="sm"
						onClick={resetTable}
						className="h-8 px-2 lg:px-3"
					>
						<RefreshCw className="mr-2 h-4 w-4" />
						Reset All
					</Button>
				)}
				<DataTableViewOptions table={table} />
			</div>
		</div>
	);
}
