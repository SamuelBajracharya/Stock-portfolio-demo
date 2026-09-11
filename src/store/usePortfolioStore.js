import { create } from "zustand";
import { marketplaceStocks, portfolioSeeds } from "../data/mockData";

const getStorageKey = (userId) => `portfolio:${userId}`;

const getInitialStocks = (userId) => {
	if (!userId || typeof window === "undefined") {
		return [];
	}

	const storedPortfolio = localStorage.getItem(getStorageKey(userId));

	if (storedPortfolio) {
		try {
			const parsedPortfolio = JSON.parse(storedPortfolio);
			return Array.isArray(parsedPortfolio) ? parsedPortfolio : [];
		} catch {
			return [];
		}
	}

	return (
		portfolioSeeds[userId]?.map((stock) => ({
			...marketplaceStocks.find((marketStock) => marketStock.symbol === stock.symbol),
			...stock,
		})) ?? []
	);
};

const getTotalValue = (stocks) =>
	stocks.reduce(
		(total, stock) =>
			total + Number(stock.price ?? stock.purchasePrice ?? 0) * Number(stock.quantity ?? 0),
		0,
	);

const savePortfolio = (userId, stocks) => {
	if (userId && typeof window !== "undefined") {
		localStorage.setItem(getStorageKey(userId), JSON.stringify(stocks));
	}
};

const updatePortfolio = (userId, createStocks) => {
	const currentStocks = getInitialStocks(userId);
	const updatedStocks = createStocks(currentStocks);

	savePortfolio(userId, updatedStocks);
	return updatedStocks;
};

export const usePortfolioStore = create((set, get) => ({
	userId: null,
	stocks: [],
	totalValue: 0,

	loadPortfolio: (userId) => {
		const stocks = getInitialStocks(userId);
		set({ userId, stocks, totalValue: getTotalValue(stocks) });
	},

	addStock: (stock, userId = get().userId) => {
		const updatedStocks = updatePortfolio(userId, (stocks) => [
			...stocks,
			{
				...stock,
				id: stock.id ?? `${userId}-${stock.symbol}-${Date.now()}`,
				quantity: Number(stock.quantity ?? 0),
			},
		]);

		set({ userId, stocks: updatedStocks, totalValue: getTotalValue(updatedStocks) });
	},

	updateQuantity: (stockId, quantity, userId = get().userId) => {
		const nextQuantity = Math.max(0, Number(quantity) || 0);
		const updatedStocks = updatePortfolio(userId, (stocks) =>
			stocks.map((stock) =>
				stock.id === stockId ? { ...stock, quantity: nextQuantity } : stock,
			),
		);

		set({ userId, stocks: updatedStocks, totalValue: getTotalValue(updatedStocks) });
	},

	removeStock: (stockId, userId = get().userId) => {
		const updatedStocks = updatePortfolio(userId, (stocks) =>
			stocks.filter((stock) => stock.id !== stockId),
		);

		set({ userId, stocks: updatedStocks, totalValue: getTotalValue(updatedStocks) });
	},
}));