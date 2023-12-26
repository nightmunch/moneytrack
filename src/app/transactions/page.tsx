import { MonthPicker } from "@/components/ui/month-picker";
import { type Transaction, columns } from "./columns";
import { DataTable } from "./data-table";
import ClientOnly from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(): Promise<Transaction[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      item: "Woodfire Shah Alam",
      amount: 100,
      category: "Food",
      date: new Date(),
    },
    {
      id: "728ed52d",
      item: "Petronas to Penang",
      amount: 100,
      category: "Petrol",
      date: new Date(),
    },
    {
      id: "728ed52e",
      item: "My50",
      amount: 100,
      category: "Transportation",
      date: new Date(),
    },
    // ...
  ];
}

export default async function Transactions() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-3 px-10 py-4">
      <div className="pb-2">
        <h1 className="text-xl font-semibold text-primary">Transactions</h1>
        <h2 className="text-sm text-muted-foreground">
          Here's the list of all your transactions.
        </h2>
      </div>
      <MonthPicker />
      <ClientOnly LoadingComponent={<Loading />}>
        <DataTable columns={columns} data={data} />
      </ClientOnly>
    </div>
  );
}

function Loading() {
  return (
    <div className="grid grid-flow-row gap-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}
