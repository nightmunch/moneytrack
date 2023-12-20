"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";

export const MonthCalendar = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const selectedMonthYear = {
    month: selectedMonth,
    year: selectedYear,
  };
  console.log({ selectedMonthYear });
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
  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => setSelectedYear(selectedYear - 1)}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-sm font-semibold">{selectedYear}</h1>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => setSelectedYear(selectedYear + 1)}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-1 text-center">
        {months.map((month, index) => (
          <Button
            variant="ghost"
            key={month}
            onClick={() => setSelectedMonth(index + 1)}
            className={`focus:bg-accent ${
              selectedMonth == index + 1 ? "bg-accent" : ""
            }`}
          >
            {month}
          </Button>
        ))}
      </div>
    </>
  );
};
