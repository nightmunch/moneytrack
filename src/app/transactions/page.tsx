import { MonthPicker } from "@/components/ui/month-picker";

export default function Transactions() {
  return (
    <div className="flex flex-col gap-3 px-10 py-4">
      <h1 className="text-xl font-semibold text-primary">Transactions</h1>
      <MonthPicker />
    </div>
  );
}
