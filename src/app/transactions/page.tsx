import { MonthPicker } from "@/components/ui/month-picker";
import { type Transaction, columns } from "./columns";
import { DataTable } from "./data-table";
import ClientOnly from "@/components/client-only";

async function getData(): Promise<Transaction[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      item: "Payment",
      amount: 100,
      category: "Food",
      date: new Date(),
    },
    // ...
  ];
}

export default async function Transactions() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-3 px-10 py-4">
      <h1 className="text-xl font-semibold text-primary">Transactions</h1>
      <MonthPicker />
      <ClientOnly>
        <DataTable columns={columns} data={data} />
      </ClientOnly>
    </div>
  );
}
