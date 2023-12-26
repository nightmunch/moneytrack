"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Separator } from "../separator";
import { DatePicker } from "../date-picker";

export function NewClaimDrawer() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const title = "Add Claim";
  const description = "Add a new claim to your account.";

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <OpenButton />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-primary">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <Separator />
          <AddClaimForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <OpenButton />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-primary">{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <Separator className="mb-5" />
        <AddClaimForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AddClaimForm({ className }: React.ComponentProps<"form">) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="item">Item</Label>
        <Input type="text" id="item" placeholder="zus kopi" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="flex items-center gap-2">
          <span>RM</span>
          <Input type="number" id="amount" placeholder="10.00" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="date">Date</Label>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

const OpenButton = ({ className }: React.ComponentProps<"button">) => (
  <Button variant={"default"} size={"icon"} className={className}>
    <Plus className="h-4 w-4" />
    <span className="sr-only">Add Claim</span>
  </Button>
);
