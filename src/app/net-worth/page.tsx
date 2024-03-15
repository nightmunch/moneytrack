import { DataTable } from "./data-table";
import { columns } from "./columns";
import { NewNetWorthDrawer } from "@/components/ui/net-worth/new-net-worth-drawer";
import { formatCurrencyToRM } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type NetWorth } from "@/lib/schema";
import ClientOnly from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";
import { UpdateNetWorthDrawer } from "@/components/ui/net-worth/update-net-worth-drawer";

async function getData(): Promise<NetWorth[] | null> {
  // Fetch data from your API here.
  const netWorthsQuery = await api.netWorth.getAll.query();

  // remove property createdAt and createdById
  if (netWorthsQuery) {
    const netWorths = netWorthsQuery.map((netWorth) => {
      return {
        id: netWorth.id,
        item: netWorth.item,
        remarks: netWorth.remarks ?? undefined,
        amount: netWorth.amount,
        currency: netWorth.currency,
        category: netWorth.category,
        liquidity: netWorth.liquidity,
      };
    });
    return netWorths;
  } else {
    return null;
  }
}

export default async function NetWorth() {
  const data = await getData();
  const ethPrice = await api.netWorth.getCryptoPriceInMYR.query({
    symbol: "ETH",
  });
  const cryptoAdjusted = data
    ? data.map((item) => {
        if (item.currency !== "RM") {
          return {
            ...item,
            amount: item.amount * ethPrice,
          };
        }
        return item;
      })
    : null;
  return (
    <div className="flex flex-col gap-4 px-10 py-8 sm:px-36">
      <h1 className="text-center text-xl font-semibold">Net Worth</h1>
      <h2 className="text-center text-sm text-muted-foreground">
        Total Net Worth
      </h2>
      <h1 className="text-center text-2xl font-semibold text-primary">
        {formatCurrencyToRM(
          cryptoAdjusted?.reduce((acc, curr) => acc + curr.amount, 0) ?? 0,
        )}
      </h1>
      <div className="flex justify-end gap-2">
        <NewNetWorthDrawer />
      </div>
      <ClientOnly LoadingComponent={<Loading />}>
        {cryptoAdjusted && (
          <DataTable
            columns={columns}
            data={cryptoAdjusted}
            cryptoPrice={ethPrice}
          />
        )}
      </ClientOnly>
      <UpdateNetWorthDrawer />
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
