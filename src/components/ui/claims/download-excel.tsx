"use client";
import type { Claim } from "@/lib/schema";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Sheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { utils, write } from "xlsx";
import toast from "react-hot-toast";

export function DownloadExcel({ data }: { data: Claim[] }) {
  function generateExcel() {
    if (data) {
      const totalAmount = data.reduce(
        (total, claim) => total + claim.amount,
        0,
      );

      const dataWithTotal = [
        ...data,
        {
          Item: "Total",
          Amount: totalAmount,
          Date: "",
        },
      ];

      // current date in string
      const date = new Date().toLocaleDateString();

      const workbook = utils.book_new();

      const worksheet = utils.json_to_sheet(dataWithTotal, {
        header: ["Item", "Amount", "Date"],
      });

      utils.book_append_sheet(workbook, worksheet, "Claims");

      const excelBuffer = write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      }) as BlobPart;

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const objectURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = "";
      a.download = `Claims-${date}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectURL);

      toast.success("Your claims have been downloaded to Excel. 🎉");
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"outline"} size={"icon"} onClick={generateExcel}>
            <Sheet className="h-4 w-4" />
            <span className="sr-only">Download to Excel</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download to Excel</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
