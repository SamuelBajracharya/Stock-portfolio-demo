import { useEffect, useState } from "react";
import StockCard from "../components/StockCard";
import StockHistoryChart from "../components/StockHistoryChart";
import TradeDialog from "../components/TradeDialog";
import { useAuthStore } from "../store/useAuthStore";
import { usePortfolioStore } from "../store/usePortfolioStore";
import { useTradeStore } from "../store/useTradeStore";

const Portfolio = () => {
  const userId = useAuthStore((state) => state.userId);
  const loadPortfolio = usePortfolioStore((state) => state.loadPortfolio);
  const stocks = usePortfolioStore((state) => state.stocks);
  const tradeDialog = useTradeStore((state) => state.tradeDialog);
  const openTradeDialog = useTradeStore((state) => state.openTradeDialog);
  const [selectedStockId, setSelectedStockId] = useState(null);

  useEffect(() => {
    loadPortfolio(userId);
  }, [loadPortfolio, userId]);

  const selectedStock =
    stocks.find((stock) => stock.id === selectedStockId) ?? stocks[0];

  const formatStatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (letter) => letter.toUpperCase());

  const formatStatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    return String(value ?? "-");
  };

  return (
    <div className="grid h-[calc(100vh-9rem)] min-h-0 grid-cols-7 gap-8 p-2">
      <div className="col-span-5 flex h-full min-h-0 flex-col">
        {/* My Stocks */}
        <div className="shrink-0">
          <h2 className="mb-6 text-2xl font-semibold">My Stocks</h2>

          <div className="flex flex-row items-center gap-4 overflow-scroll flex-nowrap scrollbar-hide">
            {stocks.map((stock) => (
              <StockCard
                key={stock.id}
                stock={stock}
                active={stock.id === selectedStock?.id}
                onClick={() => setSelectedStockId(stock.id)}
              />
            ))}
          </div>
        </div>

        {/* Price History */}
        <div className="mt-6 flex min-h-0 flex-1 flex-col">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Price History</h2>

            <span className="text-sm text-textsecondary">
              Last {selectedStock?.sparkline?.length ?? 0} sessions
            </span>
          </div>

          <div className="min-h-0 flex-1">
            <StockHistoryChart stock={selectedStock} />
          </div>
        </div>
      </div>

      {/* Stock Stats */}
      <div className="col-span-2 h-full overflow-y-auto rounded-2xl bg-secondaryBG p-6">
        {selectedStock ? (
          <div className="flex h-full flex-col">
            <div className="mb-6">
              <p className="text-2xl font-semibold">{selectedStock.symbol}</p>
              <p className="mt-1 text-sm text-textsecondary">
                {selectedStock.company}
              </p>
            </div>

            <div className="space-y-3">
              {Object.entries(selectedStock)
                .filter(([key]) => key !== "id")
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-start justify-between gap-4 border-b border-textmain/10 pb-2 text-sm"
                  >
                    <span className="text-textsecondary">
                      {formatStatLabel(key)}
                    </span>
                    <span className="max-w-[65%] text-right wrap-break-word">
                      {formatStatValue(value)}
                    </span>
                  </div>
                ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-2 gap-y-3 pt-6">
              <button
                type="button"
                onClick={() => openTradeDialog("buy", selectedStock.id)}
                className="rounded-xl bg-success px-3 py-2 text-sm font-medium text-textmain transition hover:opacity-90"
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => openTradeDialog("sell", selectedStock.id)}
                disabled={!Number(selectedStock.quantity ?? 0)}
                className="rounded-xl bg-danger px-3 py-2 text-sm font-medium text-textmain transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Sell
              </button>
              <button
                type="button"
                onClick={() => openTradeDialog("sellAll", selectedStock.id)}
                className="col-span-2 rounded-xl border border-danger px-3 py-2 text-sm font-medium text-danger transition hover:bg-danger/10"
              >
                Sell all
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-sm text-textsecondary">
            Add a stock to view its details.
          </div>
        )}
      </div>

      {tradeDialog && (
        <TradeDialog
          action={tradeDialog.action}
          stock={stocks.find((stock) => stock.id === tradeDialog.stockId)}
        />
      )}
    </div>
  );
};

export default Portfolio;
