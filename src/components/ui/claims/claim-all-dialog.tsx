"use client";
import { type Dispatch, type SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "react-hot-toast";
import { claimFormSchema as formSchema } from "@/lib/schema";
import { useAtom, useAtomValue } from "jotai";
import { claimUpdateAtom, claimAllDialogHandlerAtom } from "@/lib/atoms";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

export function ClaimAllDialog() {
  const router = useRouter();
  const [open, setOpen] = useAtom(claimAllDialogHandlerAtom);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const title = "Claim All";
  const description = "Are you sure you want to claim all your claims?";

  const claimAll = api.claim.deleteAll.useMutation({
    onSuccess: () => {
      setOpen(false);
      toast.success("All claims have been claimed");
      void router.refresh();
    },
  });

  function onClick() {
    claimAll.mutate();
  }

  if (!isMobile) {
    return (
      <TooltipProvider>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Claim All</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <AlertCircle className="mx-auto mb-3 h-10 w-10 text-destructive" />
              <DialogTitle className="text-center text-destructive">
                {title}
              </DialogTitle>
              <DialogDescription className="text-center">
                {description}
              </DialogDescription>
            </DialogHeader>
            <Button variant="destructive" onClick={onClick}>
              Claim All
            </Button>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Claim All</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <AlertCircle className="mx-auto mb-3 h-10 w-10 text-destructive" />
          <DrawerTitle className="text-destructive">{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <Button variant="destructive" onClick={onClick}>
            Claim All
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
