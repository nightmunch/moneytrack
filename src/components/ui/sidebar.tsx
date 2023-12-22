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

export function Sidebar() {
  const pages = [
    { url: "/transactions", name: "Transactions" },
    { url: "/claims", name: "Claims" },
  ];
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
          {pages.map((page) => (
            <SheetClose asChild>
              <Button
                variant={`${pathname === page.url ? "default" : "outline"}`}
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
