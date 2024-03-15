"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelRight } from "lucide-react";
import { api } from "@/trpc/react";

export function Sidebar() {
  const transactionGroups =
    api.transaction.getUserTransactionGroups.useQuery().data;
  const transactionPages = [
    ...(transactionGroups
      ? transactionGroups.map(({ transactionGroup }) => ({
          url: `/transactions/${transactionGroup.id}`,
          highlight: `/transactions/${transactionGroup.id}`,
          name: transactionGroup.name,
        }))
      : []),
  ];

  const claimPages = [{ url: "/claims", highlight: "/claims", name: "Claims" }];
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <PanelRight className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[15rem]">
        <SheetHeader>
          <SheetTitle className="text-primary">Money Track</SheetTitle>
          <SheetDescription className="text-balance">
            Track your expenses and saving.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="grid gap-2">
          <h2 className="text-sm text-primary">Transactions</h2>
          {transactionPages.map((page) => (
            <SheetClose asChild key={page.url}>
              <Button
                variant={`${
                  pathname.includes(page.highlight) ? "default" : "outline"
                }`}
                className="justify-start"
                asChild
              >
                <Link href={page.url}>{page.name}</Link>
              </Button>
            </SheetClose>
          ))}
          <Separator className="my-3" />
          <h2 className="text-sm text-primary">Claims</h2>
          {claimPages.map((page) => (
            <SheetClose asChild key={page.url}>
              <Button
                variant={`${
                  pathname.includes(page.highlight) ? "default" : "outline"
                }`}
                className="justify-start"
                asChild
              >
                <Link href={page.url}>{page.name}</Link>
              </Button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
