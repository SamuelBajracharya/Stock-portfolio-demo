import { useState } from "react";
import { flexRender, stockFeatures, useTable } from "@tanstack/react-table";
import StockHistoryChart from "../components/StockHistoryChart";
import TradeDialog from "../components/TradeDialog";
import { marketplaceStocks } from "../data/mockData";
import { useTradeStore } from "../store/useTradeStore";

const marketStocks = marketplaceStocks.map((stock) => ({
  ...stock,
  id: `market-${stock.symbol}`,
}));

// table columns
const columns = [
  {
    accessorKey: "symbol",
    header: "Instrument",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <span
          className="size-2.5 rounded-full"
          style={{ backgroundColor: row.original.accent }}
        />
        <div>
          <p className="font-semibold text-textmain">{row.original.symbol}</p>
          <p className="text-xs text-textsecondary">{row.original.company}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "sector",
    header: "Sector",
    cell: ({ getValue }) => (
      <span className="text-textsecondary">{getValue()}</span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => `$${Number(getValue()).toFixed(2)}`,
  },
  {
    accessorKey: "change",
    header: "24h",
    cell: ({ getValue }) => {
      const change = Number(getValue());

      return (
        <span className={change >= 0 ? "text-success" : "text-danger"}>
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </span>
      );
    },
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ getValue }) => (
      <span className="text-textsecondary">{getValue()}</span>
    ),
  },
];

const formatDetailLabel = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());

const formatDetailValue = (value) => {
  if (Array.isArray(value)) {
    return `${value.length} sessions`;
  }

  return String(value ?? "-");
};

const Markets = () => {
  const [selectedStock, setSelectedStock] = useState(marketStocks[0]);
  const tradeDialog = useTradeStore((state) => state.tradeDialog);
  const openTradeDialog = useTradeStore((state) => state.openTradeDialog);

  const table = useTable({
    features: stockFeatures,
    data: marketStocks,
    columns,
  });

  return (
    <div className="grid h-[calc(100vh-9rem)] min-h-0 grid-cols-7 gap-8 p-2">
      <section className="col-span-4 flex min-h-0 flex-col">
        <div className="mb-6 flex items-end justify-between">
          <div>
            {/* Heading */}
            <h1 className="mt-2 text-3xl font-semibold">Market instruments</h1>
          </div>
          <p className="text-sm text-textsecondary">
            {marketStocks.length} listed
          </p>
        </div>

        {/* Stock Instruments table */}
        <div className="min-h-0 overflow-auto scrollbar-hide rounded-2xl bg-secondaryBG">
          <table className="w-full min-w-180 border-collapse text-left ">
            <thead className="sticky top-0 z-10 bg-secondaryBG">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-textmain/10"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-textsecondary"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedStock(row.original)}
                  className={`cursor-pointer border-b border-textmain/5 transition last:border-b-0 hover:bg-highlight ${
                    selectedStock.id === row.original.id ? "bg-highlight" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-4 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="col-span-3 min-h-0 overflow-y-auto rounded-2xl bg-secondaryBG p-6">
        <div className="flex min-h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: selectedStock.accent }}
                />
                <p className="text-3xl font-semibold">{selectedStock.symbol}</p>
              </div>
              <p className="mt-1 text-sm text-textsecondary">
                {selectedStock.company}
              </p>
            </div>
            <span
              className="rounded-lg px-3 py-2 text-xs font-medium"
              style={{
                color: selectedStock.accent,
                backgroundColor: `${selectedStock.accent}20`,
              }}
            >
              {selectedStock.sector}
            </span>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <p className="text-4xl font-semibold">
              ${selectedStock.price.toFixed(2)}
            </p>
            <p
              className={`text-sm font-medium ${
                selectedStock.change >= 0 ? "text-success" : "text-danger"
              }`}
            >
              {selectedStock.change >= 0 ? "+" : ""}
              {selectedStock.change.toFixed(2)}%
            </p>
          </div>

          {/* Stock history chart */}
          <div className="mt-6 h-52 shrink-0">
            <StockHistoryChart stock={selectedStock} />
          </div>

          <div className="mt-16 space-y-3">
            {Object.entries(selectedStock)
              .filter(([key]) => !["id", "sparkline", "accent"].includes(key))
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-4 border-b border-textmain/10 pb-2 text-sm"
                >
                  <span className="text-textsecondary">
                    {formatDetailLabel(key)}
                  </span>
                  <span className="text-right">
                    {key === "price"
                      ? `$${Number(value).toFixed(2)}`
                      : formatDetailValue(value)}
                  </span>
                </div>
              ))}
          </div>

          <button
            type="button"
            onClick={() =>
              openTradeDialog("buyNew", selectedStock.id, selectedStock)
            }
            className="mt-auto w-full rounded-xl bg-accent px-4 py-3 font-medium text-white transition hover:opacity-90"
          >
            Buy {selectedStock.symbol}
          </button>
        </div>
      </aside>

      {tradeDialog?.action === "buyNew" && (
        <TradeDialog action={tradeDialog.action} stock={tradeDialog.stock} />
      )}
    </div>
  );
};

export default Markets;
