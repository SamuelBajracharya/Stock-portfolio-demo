export const mockUsers = [
  {
    id: "user-001",
    name: "Maya Thompson",
    email: "maya.thompson@example.com",
    avatar: "MT",
    role: "Growth investor",
    password: "maya123"
},
{
    id: "user-002",
    name: "Daniel Kim",
    email: "daniel.kim@example.com",
    avatar: "DK",
    role: "Long-term investor",
    password: "daniel123"
},
{
    id: "user-003",
    name: "Sofia Martinez",
    email: "sofia.martinez@example.com",
    avatar: "SM",
    role: "Value investor",
    password: "sofia123"
},
];

export const marketplaceStocks = [
  {
    symbol: "NVDA",
    company: "NVIDIA Corporation",
    sector: "Semiconductors",
    price: 878.36,
    change: 4.82,
    volume: "42.8M",
    accent: "#76b900",
    sparkline: [720, 748, 735, 790, 778, 830, 878],
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    sector: "Consumer technology",
    price: 189.98,
    change: 1.36,
    volume: "58.1M",
    accent: "#a2aaad",
    sparkline: [176, 182, 178, 185, 181, 187, 190],
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corporation",
    sector: "Software",
    price: 415.56,
    change: -0.74,
    volume: "19.7M",
    accent: "#00a4ef",
    sparkline: [430, 424, 429, 421, 426, 418, 416],
  },
  {
    symbol: "AMZN",
    company: "Amazon.com, Inc.",
    sector: "E-commerce",
    price: 182.41,
    change: 2.19,
    volume: "36.4M",
    accent: "#ff9900",
    sparkline: [164, 168, 165, 174, 171, 179, 182],
  },
  {
    symbol: "TSLA",
    company: "Tesla, Inc.",
    sector: "Automotive",
    price: 177.48,
    change: -2.61,
    volume: "74.2M",
    accent: "#e82127",
    sparkline: [192, 186, 190, 181, 184, 179, 177],
  },
  {
    symbol: "META",
    company: "Meta Platforms, Inc.",
    sector: "Communication services",
    price: 502.93,
    change: 3.07,
    volume: "14.2M",
    accent: "#0668e1",
    sparkline: [460, 468, 475, 470, 489, 493, 503],
  },
];

export const initialPortfolio = [
  {
    id: "holding-001",
    symbol: "AAPL",
    company: "Apple Inc.",
    quantity: 18,
    purchasePrice: 164.2,
    purchaseDate: "2024-02-12",
  },
  {
    id: "holding-002",
    symbol: "NVDA",
    company: "NVIDIA Corporation",
    quantity: 8,
    purchasePrice: 612.5,
    purchaseDate: "2024-03-08",
  },
  {
    id: "holding-003",
    symbol: "MSFT",
    company: "Microsoft Corporation",
    quantity: 10,
    purchasePrice: 378.75,
    purchaseDate: "2024-01-24",
  },
];

export const portfolioSeeds = {
  "user-001": [
    {
      id: "user-001-holding-001",
      symbol: "AAPL",
      company: "Apple Inc.",
      quantity: 18,
      purchasePrice: 164.2,
      purchaseDate: "2024-02-12",
    },
    {
      id: "user-001-holding-002",
      symbol: "NVDA",
      company: "NVIDIA Corporation",
      quantity: 8,
      purchasePrice: 612.5,
      purchaseDate: "2024-03-08",
    },
  ],
  "user-002": [
    {
      id: "user-002-holding-001",
      symbol: "MSFT",
      company: "Microsoft Corporation",
      quantity: 10,
      purchasePrice: 378.75,
      purchaseDate: "2024-01-24",
    },
    {
      id: "user-002-holding-002",
      symbol: "AMZN",
      company: "Amazon.com, Inc.",
      quantity: 12,
      purchasePrice: 151.4,
      purchaseDate: "2024-02-20",
    },
  ],
  "user-003": [
    {
      id: "user-003-holding-001",
      symbol: "TSLA",
      company: "Tesla, Inc.",
      quantity: 15,
      purchasePrice: 194.8,
      purchaseDate: "2024-01-18",
    },
    {
      id: "user-003-holding-002",
      symbol: "META",
      company: "Meta Platforms, Inc.",
      quantity: 6,
      purchasePrice: 452.1,
      purchaseDate: "2024-03-01",
    },
  ],
};