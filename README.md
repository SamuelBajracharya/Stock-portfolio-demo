# Stockly

Stockly is a small stock-market dashboard built with React and Vite. It includes a market instrument table, stock history charts, portfolio holdings, and buy/sell interactions backed by browser local storage.

## Features

- Browse market instruments with TanStack Table.
- Select an instrument to view its price history and details.
- Add a new stock to a user portfolio from the Markets page.
- Buy, sell, or sell all holdings from the Portfolio page.
- Keep each user's portfolio separate in local storage.
- View portfolio totals and stock-level holding values.

## Getting Started

From the `react` directory:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Demo Accounts

The app uses mock authentication. Use one of these accounts:

| Email | Password |
| --- | --- |
| `maya.thompson@example.com` | `maya123` |
| `daniel.kim@example.com` | `daniel123` |
| `sofia.martinez@example.com` | `sofia123` |

## Useful Commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build
```

## Project Structure

```text
src/
  components/  Reusable layout, chart, card, and trade dialog components
  data/        Mock users, market instruments, and portfolio seeds
  pages/       Markets, Portfolio, and Login screens
  store/       Zustand stores for auth, portfolio, and trade dialog state
```

Portfolio data is stored in the browser using a user-specific key, so it remains available after logging out and signing back in as the same user.
