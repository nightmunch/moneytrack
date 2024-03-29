"use client";
import { type Dispatch, type SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";
import { type z } from "zod";
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
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const claimUpdate = useAtomValue(claimUpdateAtom);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: claimUpdate?.id ?? 0,
      item: claimUpdate?.item ?? "",
      amount: claimUpdate?.amount,
      date: claimUpdate?.date ?? new Date(),
    },
  });

  const deleteClaim = api.claim.delete.useMutation({
    onSuccess: () => {
      toast.success("Claim deleted successfully. 🎉");
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateClaim = api.claim.update.useMutation({
    onSuccess: () => {
      toast.success("Claim updated successfully. 🎉");
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.id) {
      updateClaim.mutate({
        id: values.id,
        item: values.item,
        amount: values.amount,
        date: values.date,
      });
    }
  }

  function onDelete(values: z.infer<typeof formSchema>) {
    if (values.id) {
      deleteClaim.mutate({ id: values.id });
    }
  }
  return (
    <Form {...form}>
      <form className={cn("grid items-start gap-4", className)}>
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
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          Update claim
        </Button>
        <Button variant="destructive" onClick={form.handleSubmit(onDelete)}>
          Delete claim
        </Button>
      </form>
    </Form>
  );
}
