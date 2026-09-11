import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

export default function StockCard({
  stock,
  currencySymbol = "$",
  active = false,
  onClick,
}) {
  const symbol = stock?.symbol ?? "";
  const company = stock?.company ?? "";
  const price = stock?.price ?? 0;
  const changePercent = stock?.changePercent ?? stock?.change ?? 0;
  const holdingAmount = stock?.holdingAmount ?? stock?.quantity ?? 0;
  const holdingValue = stock?.holdingValue ?? price * holdingAmount;
  const isPositive = changePercent >= 0;

  const holdingValueText = `${currencySymbol}${holdingValue.toFixed(2)}`;

  const holdingAmountText = Number(holdingAmount).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  const getFitFontSize = (textLength, maxPx, minPx, availableWidthPx) => {
    if (textLength <= 0) return maxPx;

    // Approximate average glyph width for this semi-bold numeric text.
    const estimatedCharWidthEm = 0.62;
    const fitPx = availableWidthPx / (textLength * estimatedCharWidthEm);

    return Math.max(minPx, Math.min(maxPx, fitPx));
  };

  const valueFontSizePx = getFitFontSize(holdingValueText.length, 24, 12, 112);

  const amountFontSizePx = getFitFontSize(
    holdingAmountText.length,
    22,
    12,
    104,
  );

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-secondaryBG p-5 border ${
        active ? "border-accent" : "border-transparent"
      } w-full min-w-62.5 max-w-70 ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 max-w-45">
          <p className="text-2xl font-medium truncate whitespace-nowrap">
            {symbol}
          </p>

          <p className="text-textsecondary text-sm truncate whitespace-nowrap">
            {company}
          </p>
        </div>

        <div
          className={`rounded-lg p-2 ${
            isPositive ? "bg-success/20" : "bg-danger/20"
          }`}
        >
          {isPositive ? (
            <HiTrendingUp className="size-5 text-success" />
          ) : (
            <HiTrendingDown className="size-5 text-danger" />
          )}
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-3xl font-medium leading-none">
          {currencySymbol}
          {price.toFixed(2)}
        </p>

        <p
          className={`text-sm font-medium ${
            isPositive ? "text-success" : "text-danger"
          }`}
        >
          {isPositive ? "+" : ""}
          {changePercent.toFixed(2)}%
        </p>
      </div>

      <div className="mt-6 rounded-xl bg-highlight px-4 py-3 grid grid-cols-2 gap-4 items-end">
        <div className="min-w-0 h-13 flex flex-col">
          <p className="text-xs text-textsecondary">value</p>

          <p
            className="text-primary font-medium leading-none whitespace-nowrap mt-auto"
            style={{ fontSize: `${valueFontSizePx}px` }}
          >
            {holdingValueText}
          </p>
        </div>

        <div className="min-w-0 h-13 flex flex-col text-right">
          <p className="text-xs text-textsecondary">amount</p>

          <p
            className="text-accent font-medium leading-none whitespace-nowrap mt-auto"
            style={{ fontSize: `${amountFontSizePx}px` }}
          >
            {holdingAmountText}
          </p>
        </div>
      </div>
    </div>
  );
}
