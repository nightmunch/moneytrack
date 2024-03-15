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

// Net worth to color
// Category
const netWorthCategoryToColor = [
  { category: "Savings", color: "#8fb4ff" },
  { category: "Investment", color: "#9ff089" },
] as const;

export type netWorthCategory =
  (typeof netWorthCategoryToColor)[number]["category"];

export function getColorByNetWorthCategory(category: netWorthCategory) {
  const match = netWorthCategoryToColor.find(
    (item) => item.category === category,
  );
  return match ? match.color : null;
}

export const netWorthCategories = netWorthCategoryToColor.map(
  (item) => item.category,
);
// Currency
export const netWorthCurrencies = ["RM", "ETH"];
// Liquidity
const netWorthLiquidityToColor = [
  { liquidity: "Low", color: "#9ff089" },
  { liquidity: "Medium", color: "#ffeb91" },
  { liquidity: "High", color: "#f089a1" },
] as const;

export type netWorthLiquidity =
  (typeof netWorthLiquidityToColor)[number]["liquidity"];

export function getColorByNetWorthLiquidity(liquidity: netWorthLiquidity) {
  const match = netWorthLiquidityToColor.find(
    (item) => item.liquidity === liquidity,
  );
  return match ? match.color : null;
}

export const netWorthLiquidity = netWorthLiquidityToColor.map(
  (item) => item.liquidity,
);
