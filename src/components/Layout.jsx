import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";
import { usePortfolioStore } from "../store/usePortfolioStore";

const Layout = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userName = useAuthStore((state) => state.userName);
  const userId = useAuthStore((state) => state.userId);
  const totalValue = usePortfolioStore((state) => state.totalValue);
  const loadPortfolio = usePortfolioStore((state) => state.loadPortfolio);

  useEffect(() => {
    loadPortfolio(userId);
  }, [loadPortfolio, userId]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-mainBG text-textmain">
      {/* Sidebar */}
      <Sidebar totalInvestment={totalValue} />

      {/* Main area */}
      <div className="ml-72 min-h-screen">
        {/* Navbar */}
        <header className="h-20">
          <Navbar name={userName} />
        </header>

        {/* Page content */}
        <main className="p-8 h-full min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
