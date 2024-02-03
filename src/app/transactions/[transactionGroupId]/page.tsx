import { MonthPicker } from "@/components/ui/month-picker";
import { columns } from "./columns";
import type { Transaction } from "@/lib/schema";
import { DataTable } from "./data-table";
import ClientOnly from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";
import { NewTransactionDrawer } from "@/components/ui/transactions/new-transaction-drawer";
import { formatCurrencyToRM } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { NavigationTabs } from "@/components/ui/transactions/navigation-tabs";
import { api } from "@/trpc/server";
import { UpdateTransactionDrawer } from "@/components/ui/transactions/update-transaction-drawer";

async function getData(
  transactionGroupId: string,
): Promise<Transaction[] | null> {
  // Fetch data from your API here.
  const transactionsQuery = await api.transaction.getAll.query({
    transactionGroupId: Number(transactionGroupId),
  });

  if (transactionsQuery.length > 0) {
    const transactions = transactionsQuery.map((transaction) => ({
      id: transaction.id,
      item: transaction.item,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date,
    }));
    return transactions;
  } else {
    return null;
  }
}

export default async function Transactions({
  params,
}: {
  params: { transactionGroupId: string };
}) {
  const transactionGroups =
    await api.transaction.getUserTransactionGroups.query();

  const userHaveAccessToTransactionGroup =
    transactionGroups.filter(
      (group) => group.id === Number(params.transactionGroupId),
    ).length > 0;

  const currentTransactionGroup = transactionGroups.find(
    (group) => group.id === Number(params.transactionGroupId),
  );

  if (!userHaveAccessToTransactionGroup) {
    return (
      <h1 className="px-10 py-8 text-center text-xl font-semibold text-primary">
        Unauthorized Access!
      </h1>
    );
  }
  const data = await getData(params.transactionGroupId);

  const totalExpenses = data
    ? data.reduce((total, transaction) => total + transaction.amount, 0)
    : 0;

  return (
    <div className="flex flex-col gap-4 px-10 py-8 sm:px-36">
      {/* <div className="pb-2">
        <h1 className="text-xl font-semibold text-primary">Transactions</h1>
        <h2 className="text-sm text-muted-foreground">
          Here's the list of all your transactions.
        </h2>
      </div> */}
      <div className="flex justify-center">
        {/* <h1 className="text-center text-sm font-semibold text-primary">Main</h1> */}
        <NavigationTabs className="w-[300px]" />
      </div>
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
        <h1 className="text-center text-sm font-semibold text-success">
          Income: {formatCurrencyToRM(currentTransactionGroup?.income ?? 0)}
        </h1>
        <h1 className="text-center text-sm font-semibold text-muted-foreground">
          Balance:{" "}
          {formatCurrencyToRM(
            (currentTransactionGroup?.income ?? 0) - totalExpenses,
          )}
        </h1>
      </div>
      <ClientOnly LoadingComponent={<Loading />}>
        {data && (
          <>
            <DataTable columns={columns} data={data} />
          </>
        )}
      </ClientOnly>
      <UpdateTransactionDrawer />
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
