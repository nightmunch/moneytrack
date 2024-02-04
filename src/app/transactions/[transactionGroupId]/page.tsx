import type { Transaction } from "@/lib/schema";
import { api } from "@/trpc/server";
import { ClientTransactions } from "@/components/ui/transactions/main";

async function getData(transactionGroupId: string): Promise<Transaction[]> {
  // Fetch data from your API here.
  const transactionsQuery = await api.transaction.getAll.query({
    transactionGroupId: Number(transactionGroupId),
  });

  const transactions = transactionsQuery.map((transaction) => ({
    id: transaction.id,
    item: transaction.item,
    amount: transaction.amount,
    category: transaction.category,
    date: transaction.date,
    createdBy: {
      id: transaction.createdById.id,
      name: transaction.createdById.name,
      image: transaction.createdById.image,
    },
  }));
  return transactions;
}

export default async function Transactions({
  params,
}: {
  params: { transactionGroupId: string };
}) {
  const data = await getData(params.transactionGroupId);

  return (
    <ClientTransactions
      data={data}
      transactionGroupId={params.transactionGroupId}
    />
  );
}
