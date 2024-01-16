"use client";
import { type Dispatch, type SetStateAction, useState } from "react";
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
import { Plus } from "lucide-react";
import { Separator } from "../separator";
import { DatePicker } from "../date-picker";
import { date, type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "react-hot-toast";
import { claimFormSchema as formSchema } from "@/lib/schema";
import { useAtom, useAtomValue } from "jotai";
import { claimUpdateAtom, claimUpdateDrawerHandlerAtom } from "@/lib/atoms";

export function UpdateClaimDrawer() {
  const [open, setOpen] = useAtom(claimUpdateDrawerHandlerAtom);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const title = "Update Claim";
  const description = "Update a claim in your account.";

  if (!isMobile) {
    return (
      <TooltipProvider>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-primary">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <Separator />
            <UpdateClaimForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-primary">{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <UpdateClaimForm className="px-4" setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function UpdateClaimForm({
  className,
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
} & React.ComponentProps<"form">) {
  const claimUpdate = useAtomValue(claimUpdateAtom);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: claimUpdate?.item ?? "",
      amount: claimUpdate?.amount,
      date: claimUpdate?.date ?? new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast.success("Claim updated successfully. 🎉");
    setOpen(false);
  }
  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <FormField
            name="item"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="item"
                    placeholder="zus kopi"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <span>RM</span>
                    <Input
                      type="number"
                      id="amount"
                      placeholder="10.00"
                      {...field}
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update claim</Button>
      </form>
    </Form>
  );
}
