import { useState } from "react";
import { usePortfolioStore } from "../store/usePortfolioStore";
import { useTradeStore } from "../store/useTradeStore";

export default function TradeDialog({ stock, action }) {
  const updateQuantity = usePortfolioStore((state) => state.updateQuantity);
  const removeStock = usePortfolioStore((state) => state.removeStock);
  const closeTradeDialog = useTradeStore((state) => state.closeTradeDialog);
  const [quantity, setQuantity] = useState("1");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (action === "sellAll") {
      removeStock(stock.id);
      closeTradeDialog();
      return;
    }

    const tradeQuantity = Number(quantity);
    const currentQuantity = Number(stock?.quantity ?? 0);

    if (!stock || !Number.isFinite(tradeQuantity) || tradeQuantity <= 0) {
      setError("Enter a quantity greater than zero.");
      return;
    }

    if (action === "sell" && tradeQuantity > currentQuantity) {
      setError(`You can sell up to ${currentQuantity}.`);
      return;
    }

    const nextQuantity =
      action === "buy"
        ? currentQuantity + tradeQuantity
        : currentQuantity - tradeQuantity;

    updateQuantity(stock.id, nextQuantity);
    closeTradeDialog();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-secondaryBG p-6 shadow-xl"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {action === "sellAll"
                ? `Sell all ${stock.symbol}`
                : `${action === "buy" ? "Buy" : "Sell"} ${stock.symbol}`}
            </h2>
            <p className="mt-1 text-sm text-textsecondary">
              {action === "sellAll"
                ? "Are you sure you want to sell all of this holding?"
                : `How many shares would you like to ${action}?`}
            </p>
          </div>
          <button
            type="button"
            onClick={closeTradeDialog}
            className="text-xl text-textsecondary transition hover:text-textmain"
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>

        {action !== "sellAll" && (
          <>
            <label
              htmlFor="trade-quantity"
              className="mb-2 block text-sm text-textsecondary"
            >
              Quantity
            </label>
            <input
              id="trade-quantity"
              type="number"
              min="0.01"
              step="0.01"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="w-full rounded-xl bg-highlight px-4 py-3 text-textmain outline-none focus:ring-2 focus:ring-accent"
              autoFocus
            />
          </>
        )}

        {error && <p className="mt-2 text-sm text-danger">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeTradeDialog}
            className="rounded-xl border border-textmain/20 px-4 py-2 text-sm font-medium text-textsecondary transition hover:text-textmain"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`rounded-xl px-4 py-2 text-sm font-medium text-textmain transition hover:opacity-90 ${
              action === "buy" ? "bg-success" : "bg-danger"
            }`}
          >
            {action === "sellAll" ? "Confirm sell all" : `Confirm ${action}`}
          </button>
        </div>
      </form>
    </div>
  );
}
