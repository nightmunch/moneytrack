// Category to color
const categoryToColor = [
  { category: "Food", color: "#58c551" },
  { category: "Petrol", color: "#f5a623" },
  { category: "Transportation", color: "#24cced" },
] as const;

export type Category = (typeof categoryToColor)[number]["category"];

export function getColorByCategory(category: Category): string | null {
  const match = categoryToColor.find((item) => item.category === category);
  return match ? match.color : null;
}
