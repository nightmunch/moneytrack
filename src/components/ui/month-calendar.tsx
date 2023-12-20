"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./button";

export const MonthCalendar = ({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const updateDate = (yearOffset: number) => {
    setDate(
      date
        ? new Date(date.getFullYear() + yearOffset, date.getMonth())
        : new Date(currentYear + yearOffset, currentMonth),
    );
  };
  function getMonthVariant(
    date: Date | undefined,
    index: number,
    currentMonth: number,
    currentYear: number,
  ): "default" | "accent" | "ghost" {
    if (!date && index === currentMonth) {
      return "accent";
    } else if (date?.getMonth() === index) {
      return "default";
    } else if (index === currentMonth) {
      return date?.getFullYear() === currentYear ? "accent" : "ghost";
    } else {
      return "ghost";
    }
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon-sm" onClick={() => updateDate(-1)}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-sm font-semibold">
          {date ? date.getFullYear() : currentYear}
        </h1>
        <Button variant="ghost" size="icon-sm" onClick={() => updateDate(1)}>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 text-center">
        {months.map((month, index) => (
          <Button
            variant={getMonthVariant(date, index, currentMonth, currentYear)}
            key={month}
            // if the current month is selected, set selectedmonth to 0
            onClick={() =>
              setDate(
                date && date.getMonth() === index
                  ? undefined
                  : date
                    ? new Date(date.getFullYear(), index)
                    : new Date(currentYear, index),
              )
            }
          >
            {month}
          </Button>
        ))}
      </div>
    </div>
  );
};
