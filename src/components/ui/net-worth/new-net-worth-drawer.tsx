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
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { netWorthFormSchema as formSchema } from "@/lib/schema";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import {
  netWorthCurrencies,
  netWorthCategories,
  netWorthLiquidity,
} from "@/lib/dicts";

export function NewNetWorthDrawer() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const title = "Add Net Worth";
  const description = "Add a new net worth to your account.";

  if (!isMobile) {
    return (
      <TooltipProvider>
        <Dialog open={open} onOpenChange={setOpen}>
          <Tooltip>
            <DialogTrigger asChild>
              <TooltipTrigger asChild>
                <Button variant={"default"} size={"icon"}>
                  <OpenAddNetWorthButton />
                </Button>
              </TooltipTrigger>
            </DialogTrigger>
            <TooltipContent>Add Net Worth</TooltipContent>
          </Tooltip>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-primary">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <Separator />
            <AddNetWorthForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"default"} size={"icon"}>
          <OpenAddNetWorthButton />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-primary">{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <Separator className="mb-5" />
        <AddNetWorthForm className="px-4" setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AddNetWorthForm({
  className,
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
} & React.ComponentProps<"form">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: "",
      remarks: "",
      amount: 0,
      currency: undefined,
      category: undefined,
      liquidity: undefined,
    },
  });

  const createNetWorth = api.netWorth.create.useMutation({
    onSuccess: async () => {
      toast.success("Net Worth added successfully. 🎉");
      setOpen(false);
      router.refresh();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createNetWorth.mutate(values);
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
                    <span>
                      {form.getValues().currency === undefined
                        ? "?"
                        : form.getValues().currency}
                    </span>
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
        <Button type="submit">Add new net worth</Button>
      </form>
    </Form>
  );
}

const OpenAddNetWorthButton = () => {
  return (
    <>
      <Plus className="h-4 w-4" />
      <span className="sr-only">Add Net Worth</span>
    </>
  );
};
