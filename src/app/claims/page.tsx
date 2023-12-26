import { Button } from "@/components/ui/button";
import { type Claim, columns } from "./columns";
import { DataTable } from "./data-table";
import ClientOnly from "@/components/client-only";
import { Sheet } from "lucide-react";
import { NewClaimDrawer } from "@/components/ui/claims/new-claim-drawer";

async function getData(): Promise<Claim[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      item: "KFC Subang",
      amount: 100,
      date: new Date(),
    },
    {
      id: "728ed52d",
      item: "Subway",
      amount: 100,
      date: new Date(),
    },
    {
      id: "728ed52e",
      item: "My50",
      amount: 100,
      date: new Date(),
    },
    // ...
  ];
}

export default async function Claims() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-3 px-10 py-4">
      <div className="pb-2">
        <h1 className="text-xl font-semibold text-primary">Claims</h1>
        <h2 className="text-sm text-muted-foreground">
          Here's the list of all your claims.
        </h2>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant={"outline"} size={"icon"}>
          <Sheet className="h-4 w-4" />
          <span className="sr-only">Download to Excel</span>
        </Button>
        <Button variant={"outline"}>Claim All</Button>
        <ClientOnly>
          <NewClaimDrawer />
        </ClientOnly>
      </div>
      <ClientOnly>
        <DataTable columns={columns} data={data} />
      </ClientOnly>
    </div>
  );
}
