"use client";
import { AxisOptions, Chart, UserSerie } from "react-charts";
import { useMemo } from "react";
import { useTheme } from "next-themes";

type Datum = {
  month: string;
  amount: number;
};

export default function Dashboard() {
  const { resolvedTheme } = useTheme();
  // Give example of ordinal data for each month
  const data: UserSerie<Datum>[] = [
    {
      label: "Series 1",
      data: [
        { month: "January", amount: 100 },
        { month: "February", amount: 200 },
        { month: "March", amount: 300 },
        { month: "April", amount: 400 },
        { month: "May", amount: 500 },
        { month: "June", amount: 600 },
        { month: "July", amount: 700 },
        { month: "August", amount: 800 },
        { month: "September", amount: 900 },
        { month: "October", amount: 1000 },
        { month: "November", amount: 1100 },
        { month: "December", amount: 1200 },
      ],
    },
    {
      label: "Series 2",
      data: [
        { month: "January", amount: 300 },
        { month: "February", amount: 400 },
        { month: "March", amount: 500 },
        { month: "April", amount: 600 },
        { month: "May", amount: 700 },
        { month: "June", amount: 800 },
        { month: "July", amount: 900 },
        { month: "August", amount: 1000 },
        { month: "September", amount: 1100 },
        { month: "October", amount: 1200 },
        { month: "November", amount: 1300 },
        { month: "December", amount: 1400 },
      ],
    },
    {
      label: "Series 3",
      data: [
        { month: "January", amount: 500 },
        { month: "February", amount: 600 },
        { month: "March", amount: 700 },
        { month: "April", amount: 800 },
        { month: "May", amount: 900 },
        { month: "June", amount: 1000 },
        { month: "July", amount: 1100 },
        { month: "August", amount: 1200 },
        { month: "September", amount: 1300 },
        { month: "October", amount: 1400 },
        { month: "November", amount: 1500 },
        { month: "December", amount: 1600 },
      ],
    },
  ];

  const primaryAxis = useMemo(
    (): AxisOptions<Datum> => ({
      getValue: (datum) => datum.month,
    }),
    [],
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<Datum>[] => [
      {
        getValue: (datum) => datum.amount,
        elementType: "bar",
        min: 0,
      },
    ],
    [],
  );
  return (
    <div className="flex flex-col gap-4 px-10 py-8 sm:px-36">
      <h1>Dashboard</h1>
      <div className="h-96 w-full">
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            dark: resolvedTheme === "dark",
            getSeriesStyle: (series) => {
              return {
                color: `url(#${series.index})`,
                opacity: 1,
              };
            },
            renderSVG: () => (
              <defs>
                {[...Array(4).keys()].map((i) => (
                  <linearGradient
                    key={i}
                    id={`${i}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="100%"
                      stopColor={generateRandomColor()}
                      stopOpacity={1}
                    />
                  </linearGradient>
                ))}
              </defs>
            ),
          }}
        />
      </div>
    </div>
  );
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
