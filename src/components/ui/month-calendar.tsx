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
            variant={
              // Set the variant based on the selected month and current month
              date?.getMonth() == index
                ? "default" // Use "default" variant if the month is selected
                : index == currentMonth
                  ? "accent" // Use "accent" variant if it's the current month
                  : "ghost" // Use "ghost" variant for other months
            }
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
