import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import type { Claim } from "@/lib/schema";
import { DataTable } from "./data-table";
import ClientOnly from "@/components/client-only";
import { Sheet } from "lucide-react";
import { NewClaimDrawer } from "@/components/ui/claims/new-claim-drawer";
import { UpdateClaimDrawer } from "@/components/ui/claims/update-claim-drawer";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { api } from "@/trpc/server";
import { ClaimAllDialog } from "@/components/ui/claims/claim-all-dialog";

async function getData(): Promise<Claim[] | null> {
  // Fetch data from your API here.
  const claimsQuery = await api.claim.getAll.query();

  // remove property createdAt and createdById
  if (claimsQuery) {
    const claims = claimsQuery.map((claim) => {
      return {
        id: claim.id,
        item: claim.item,
        amount: claim.amount,
        date: claim.date,
      };
    });
    return claims;
  } else {
    return null;
  }
}

export default async function Claims() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-3 px-10 py-8 sm:px-36">
      <div className="pb-2">
        <h1 className="text-xl font-semibold text-primary">Claims</h1>
        <h2 className="text-sm text-muted-foreground">
          Here's the list of all your claims.
        </h2>
      </div>
      <ClientOnly LoadingComponent={<Loading />}>
        <div className="flex justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <Sheet className="h-4 w-4" />
                  <span className="sr-only">Download to Excel</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download to Excel</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ClaimAllDialog />
          <NewClaimDrawer />
        </div>
        {data && <DataTable columns={columns} data={data} />}
      </ClientOnly>
      <UpdateClaimDrawer />
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
