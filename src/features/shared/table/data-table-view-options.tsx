"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
// Remove unused import
// import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Settings2, Eye } from "lucide-react";

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>;
}

export function DataTableViewOptions<TData>({
	table,
}: DataTableViewOptionsProps<TData>) {
	const hiddenColumns = table
		.getAllColumns()
		.filter((column) => !column.getIsVisible());

	return (
		<div className="flex items-center space-x-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
					>
						<Settings2 className="mr-2 h-4 w-4" />
						View
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[150px]">
					<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{table
						.getAllColumns()
						.filter(
							(column) =>
								typeof column.accessorFn !== "undefined" && column.getCanHide()
						)
						.map((column) => {
							return (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{column.id}
								</DropdownMenuCheckboxItem>
							);
						})}
				</DropdownMenuContent>
			</DropdownMenu>
			{hiddenColumns.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{hiddenColumns.map((column) => (
						<Button
							key={column.id}
							variant="outline"
							size="sm"
							onClick={() => column.toggleVisibility(true)}
						>
							<Eye className="mr-2 h-4 w-4" />
							{column.id.charAt(0).toUpperCase() + column.id.slice(1)}
						</Button>
					))}
				</div>
			)}
		</div>
	);
}
