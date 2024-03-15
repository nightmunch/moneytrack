// Category to color
const categoryToColor = [
  { category: "Food/Beverages", color: "#8fb4ff" },
  { category: "Shopping", color: "#f089a1" },
  { category: "Groceries", color: "#9ff089" },
  { category: "Transportation", color: "#ffb061" },
  { category: "Bill", color: "#ffeb91" },
  { category: "Entertainment", color: "#d5abff" },
  { category: "Others", color: "#dae6e5" },
] as const;

export type Category = (typeof categoryToColor)[number]["category"];

export function getColorByCategory(category: Category): string | null {
  const match = categoryToColor.find((item) => item.category === category);
  return match ? match.color : null;
}

export const categories = categoryToColor.map((item) => item.category);
