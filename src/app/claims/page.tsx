import { type Claim, columns } from "./columns";
import { DataTable } from "./data-table";
import ClientOnly from "@/components/client-only";

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
      <h1 className="text-xl font-semibold text-primary">Claims</h1>
      <ClientOnly>
        <DataTable columns={columns} data={data} />
      </ClientOnly>
    </div>
  );
}
