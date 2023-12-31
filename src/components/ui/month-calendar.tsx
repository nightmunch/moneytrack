"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./button";
import { useRef, useEffect } from "react";

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

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentActiveElement = document.activeElement as HTMLElement;
      const gridElement = gridRef.current;

      if (
        gridElement &&
        currentActiveElement &&
        currentActiveElement.parentElement === gridElement
      ) {
        const buttonElements = gridElement.querySelectorAll("button");
        const currentButtonIndex = Array.from(buttonElements).findIndex(
          (button) => button === currentActiveElement,
        );

        type Direction = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

        function handleButtonNavigation(index: number, update: number) {
          event.preventDefault();
          const button = buttonElements[index];
          if (button) {
            button.focus();
          } else {
            updateDate(update);
          }
        }

        switch (event.key as Direction) {
          case "ArrowUp":
            handleButtonNavigation(currentButtonIndex - 3, -1);
            break;
          case "ArrowDown":
            handleButtonNavigation(currentButtonIndex + 3, 1);
            break;
          case "ArrowLeft":
            handleButtonNavigation(currentButtonIndex - 1, -1);
            break;
          case "ArrowRight":
            handleButtonNavigation(currentButtonIndex + 1, 1);
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [date]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => updateDate(-1)}
          aria-label="Previous year"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-sm font-semibold">
          {date ? date.getFullYear() : currentYear}
        </h1>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => updateDate(1)}
          aria-label="Next year"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <div
        className="grid grid-cols-3 grid-rows-4 text-center"
        role="grid"
        ref={gridRef}
      >
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
            aria-label={month}
            role="gridcell"
          >
            {month}
          </Button>
        ))}
      </div>
    </div>
  );
};
