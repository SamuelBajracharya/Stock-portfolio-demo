import { ResponsiveLine } from "@nivo/line";

const chartColors = {
  grid: "rgba(255, 255, 255, 0.07)",
  axis: "rgba(255, 255, 255, 0.22)",
  text: "#b5aeae",
  line: "#ffaa2d",
};

const formatDate = (index, total) => {
  const date = new Date();
  date.setDate(date.getDate() - (total - index - 1));

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function StockHistoryChart({ stock }) {
  const prices = stock?.history ?? stock?.sparkline ?? [];
  const safePrices = prices.filter((price) => Number.isFinite(Number(price)));

  if (!safePrices.length) {
    return (
      <div className="flex h-full min-h-64 items-center justify-center rounded-xl border border-accentBG bg-highlight">
        <p className="text-sm text-textsecondary">No price history available</p>
      </div>
    );
  }

  const data = [
    {
      id: stock?.symbol ?? "stock",
      data: safePrices.map((price, index) => ({
        x: index,
        y: Number(price),
      })),
    },
  ];

  const minPrice = Math.min(...safePrices);
  const maxPrice = Math.max(...safePrices);
  const pricePadding = Math.max((maxPrice - minPrice) * 0.18, 1);
  const labels = safePrices.map((_, index) =>
    formatDate(index, safePrices.length),
  );

  return (
    <div className="h-full min-h-64 w-full overflow-hidden rounded-xl bg-highlight p-2">
      <ResponsiveLine
        data={data}
        margin={{ top: 16, right: 18, bottom: 42, left: 52 }}
        xScale={{
          type: "linear",
          min: 0,
          max: Math.max(safePrices.length - 1, 1),
        }}
        yScale={{
          type: "linear",
          min: Math.max(0, minPrice - pricePadding),
          max: maxPrice + pricePadding,
          stacked: false,
          reverse: false,
        }}
        curve="monotoneX"
        colors={[chartColors.line]}
        lineWidth={3}
        enablePoints={false}
        enableArea
        areaOpacity={0.12}
        areaBaselineValue={Math.max(0, minPrice - pricePadding)}
        useMesh
        animate
        motionConfig="gentle"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          tickValues: Math.min(safePrices.length, 6),
          format: (value) => labels[Math.round(Number(value))] ?? "",
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 10,
          tickValues: 5,
          format: (value) => `$${Number(value).toFixed(0)}`,
        }}
        enableGridX
        enableGridY
        theme={{
          grid: {
            line: {
              stroke: chartColors.grid,
              strokeDasharray: "4 6",
              strokeWidth: 1,
            },
          },
          axis: {
            ticks: {
              text: { fill: chartColors.text, fontSize: 11 },
            },
            domain: { line: { stroke: chartColors.axis, strokeWidth: 1 } },
          },
          crosshair: {
            line: { stroke: chartColors.line, strokeWidth: 1 },
          },
        }}
        tooltip={({ point }) => {
          const pointIndex = Math.round(Number(point.data.x));

          return (
            <div className="rounded-lg border border-accentBG bg-secondaryBG px-3 py-2 text-xs shadow-lg">
              <p className="text-textsecondary">
                {labels[pointIndex] ?? "Price"}
              </p>
              <p className="mt-1 font-medium text-textmain">
                {stock?.symbol ?? "Stock"}: ${Number(point.data.y).toFixed(2)}
              </p>
            </div>
          );
        }}
      />
    </div>
  );
}
