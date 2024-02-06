"use client";
import { DataTable } from "@/app/transactions/[transactionGroupId]/data-table";
import ClientOnly from "@/components/client-only";
import { transactionMonthAtom } from "@/lib/atoms";
import { formatCurrencyToRM } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useAtomValue } from "jotai";
import { Skeleton } from "@/components/ui/skeleton";
import { NavigationTabs } from "./navigation-tabs";
import { UpdateTransactionDrawer } from "@/components/ui/transactions/update-transaction-drawer";
import { type Transaction } from "@/lib/schema";
import { api } from "@/trpc/react";
import { columns } from "@/app/transactions/[transactionGroupId]/columns";

export function ClientTransactions({
  data,
  transactionGroupId,
}: {
  data: Transaction[];
  transactionGroupId: string;
}) {
  const transactionGroups =
    api.transaction.getUserTransactionGroups.useQuery().data;

  const month = useAtomValue(transactionMonthAtom);
  if (!transactionGroups) {
    return null;
  }

  const userHaveAccessToTransactionGroup =
    transactionGroups.filter(
      (group) => group.transactionGroupId === Number(transactionGroupId),
    ).length > 0;

  if (!userHaveAccessToTransactionGroup) {
    return (
      <h1 className="px-10 py-8 text-center text-xl font-semibold text-primary">
        Unauthorized Access!
      </h1>
    );
  }

  const currentTransactionGroup = transactionGroups.find(
    (group) => group.transactionGroupId === Number(transactionGroupId),
  )?.transactionGroup;

  const totalExpensesByMonthOrAll = month
    ? data.reduce((total, curr) => {
        if (new Date(curr.date).getMonth() === month?.getMonth()) {
          total += curr.amount;
        }
        return total;
      }, 0)
    : data.reduce((total, curr) => total + curr.amount, 0);
  return (
    <div className="flex flex-col gap-4 px-10 py-8 sm:px-36">
      <h1 className="text-center text-xl font-semibold">
        {currentTransactionGroup?.name}
      </h1>
      <div className="flex justify-center">
        <NavigationTabs className="w-[300px]" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-center text-sm text-muted-foreground">
          {month ? "Expenses for the month" : "Total Expenses"}
        </h2>
        <h1 className="text-center text-2xl font-semibold text-destructive">
          {formatCurrencyToRM(totalExpensesByMonthOrAll)}
        </h1>
      </div>
      {month && (
        <>
          <Separator />
          <div>
            <h1 className="text-center text-sm font-semibold text-success">
              Income: {formatCurrencyToRM(currentTransactionGroup?.income ?? 0)}
            </h1>
            <h1 className="text-center text-sm font-semibold text-muted-foreground">
              Balance:{" "}
              {formatCurrencyToRM(
                (currentTransactionGroup?.income ?? 0) -
                  totalExpensesByMonthOrAll,
              )}
            </h1>
          </div>
        </>
      )}
      <ClientOnly LoadingComponent={<Loading />}>
        {data && <DataTable columns={columns} data={data} />}
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
