"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function NavigationTabs({ className }: React.ComponentProps<"div">) {
  return (
    <Tabs defaultValue="dashboard" className={cn("w-[400px]", className)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
