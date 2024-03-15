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
import { netWorthFormSchema as formSchema } from "@/lib/schema";
import { useAtom, useAtomValue } from "jotai";
import {
  netWorthUpdateAtom,
  netWorthUpdateDrawerHandlerAtom,
} from "@/lib/atoms";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import {
  netWorthCurrencies,
  netWorthCategories,
  netWorthLiquidity,
} from "@/lib/dicts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function UpdateNetWorthDrawer() {
  const [open, setOpen] = useAtom(netWorthUpdateDrawerHandlerAtom);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const title = "Update Net Worth";
  const description = "Update a net worth in your account.";

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
            <UpdateNetWorthForm setOpen={setOpen} />
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
        <UpdateNetWorthForm className="px-4" setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function UpdateNetWorthForm({
  className,
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
} & React.ComponentProps<"form">) {
  const router = useRouter();
  const netWorthUpdate = useAtomValue(netWorthUpdateAtom);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: netWorthUpdate?.id ?? 0,
      item: netWorthUpdate?.item ?? "",
      remarks: netWorthUpdate?.remarks ?? "",
      amount: netWorthUpdate?.amount,
      currency: netWorthUpdate?.currency,
      category: netWorthUpdate?.category,
      liquidity: netWorthUpdate?.liquidity,
    },
  });

  const deleteNetWorth = api.netWorth.delete.useMutation({
    onSuccess: () => {
      toast.success("Net Worth deleted successfully. 🎉");
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateNetWorth = api.netWorth.update.useMutation({
    onSuccess: () => {
      toast.success("Net Worth updated successfully. 🎉");
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.id) {
      updateNetWorth.mutate({
        id: values.id,
        item: values.item,
        remarks: values.remarks,
        amount: values.amount,
        currency: values.currency,
        category: values.category,
        liquidity: values.liquidity,
      });
    }
  }

  function onDelete(values: z.infer<typeof formSchema>) {
    if (values.id) {
      deleteNetWorth.mutate({ id: values.id });
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
            name="remarks"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="remarks"
                    placeholder="ke bulan! 🌙"
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
                    <span>{form.getValues().currency}</span>
                    <Input
                      type="number"
                      id="amount"
                      placeholder="10.00"
                      {...field}
                      value={field.value === 0 ? "" : field.value}
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
            name="currency"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select the currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {netWorthCurrencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {netWorthCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            name="liquidity"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liquidity</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select the liquidity" />
                    </SelectTrigger>
                    <SelectContent>
                      {netWorthLiquidity.map((liquidity) => (
                        <SelectItem key={liquidity} value={liquidity}>
                          {liquidity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          Update net worth
        </Button>
        <Button variant="destructive" onClick={form.handleSubmit(onDelete)}>
          Delete net worth
        </Button>
      </form>
    </Form>
  );
}
