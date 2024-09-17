import { DataTable } from "@/features/shared/table/data-table";
import { columns } from "@/features/claims/table/columns";
import { Claim } from "@/features/claims/table/columns";

function getData(): Claim[] {
	// Mock data for claims
	return [
		{
			id: "1",
			item: "Laptop",
			amount: 1200,
			date: "2023-05-01",
		},
		{
			id: "2",
			item: "Office Chair",
			amount: 250,
			date: "2023-05-15",
		},
		{
			id: "3",
			item: "Monitor",
			amount: 350,
			date: "2023-06-02",
		},
		{
			id: "4",
			item: "Keyboard",
			amount: 80,
			date: "2023-06-10",
		},
		{
			id: "5",
			item: "Mouse",
			amount: 30,
			date: "2023-06-10",
		},
		// Add more mock data as needed
	];
}

export default function ClaimsPage() {
	const data = getData();

	return (
		<div className="container mx-auto py-20 px-20">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
