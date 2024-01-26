import { MonthPicker } from "@/components/ui/month-picker";
import { type Transaction, columns } from "./columns";
import { DataTable } from "./data-table";
import ClientOnly from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";
import { NewTransactionDrawer } from "@/components/ui/transactions/new-transaction-drawer";
import { formatCurrencyToRM } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

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

  const totalExpenses = data.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  return (
    <div className="flex flex-col gap-4 px-10 py-8 sm:px-36">
      {/* <div className="pb-2">
        <h1 className="text-xl font-semibold text-primary">Transactions</h1>
        <h2 className="text-sm text-muted-foreground">
          Here's the list of all your transactions.
        </h2>
      </div> */}
      <div className="flex flex-col gap-1">
        <h2 className="text-center text-sm text-muted-foreground">
          Expenses for the month
        </h2>
        <h1 className="text-center text-2xl font-semibold text-destructive">
          {formatCurrencyToRM(totalExpenses)}
        </h1>
      </div>
      <Separator />
      <div>
        <h1 className="text-success text-center text-sm font-semibold">
          Income: {formatCurrencyToRM(4400)}
        </h1>
        <h1 className="text-center text-sm font-semibold text-muted-foreground">
          Balance: {formatCurrencyToRM(4400 - totalExpenses)}
        </h1>
      </div>
      <ClientOnly LoadingComponent={<Loading />}>
        <div className="flex gap-2">
          <MonthPicker className="grow" />
          <NewTransactionDrawer />
        </div>
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
