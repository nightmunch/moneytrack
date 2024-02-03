"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MonthCalendar } from "./month-calendar";

export function MonthPicker({
  date,
  setDate,
  className,
}: ButtonProps & {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  //   const [date, setDate] = React.useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date !== undefined ? (
            format(date, "MMMM, yyyy")
          ) : (
            <span>Pick a month</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <MonthCalendar date={date} setDate={setDate} />
      </PopoverContent>
    </Popover>
  );
}
