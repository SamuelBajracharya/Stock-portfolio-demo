import { create } from "zustand";

export const useTradeStore = create((set) => ({
  tradeDialog: null,

  openTradeDialog: (action, stockId) => {
    set({ tradeDialog: { action, stockId } });
  },

  closeTradeDialog: () => {
    set({ tradeDialog: null });
  },
}));
