import { create } from "zustand";

export const useTradeStore = create((set) => ({
  tradeDialog: null,

  openTradeDialog: (action, stockId, stock = null) => {
    set({ tradeDialog: { action, stockId, stock } });
  },

  closeTradeDialog: () => {
    set({ tradeDialog: null });
  },
}));
