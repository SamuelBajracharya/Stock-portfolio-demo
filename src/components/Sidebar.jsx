import { Link, useLocation } from "react-router-dom";
import { FaChartLine, FaWallet } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Sidebar = ({ totalInvestment = 0, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <aside className="fixed top-4 left-4 w-70 h-[calc(100vh-32px)] bg-secondaryBG rounded-2xl p-5 flex flex-col shadow-lg z-50">

      {/* Logo */}
      <div className="h-20 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-textmain">
          Stockly
        </h1>
      </div>

      {/* Total Investment */}
      <div className="mt-4 p-5 rounded-2xl bg-success">
        <div className="flex items-center gap-2 text-main text-sm">
          <FaWallet size={14} />
          <span>Total Investment</span>
        </div>

        <p className="mt-3 text-2xl font-semibold text-textmain">
          ${totalInvestment.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-8 space-y-2">

        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
            isActive("/")
              ? "bg-accent text-white"
              : "text-textmain hover:bg-accent/40"
          }`}
        >
          <FaChartLine size={18} />
          <span>Marketplace</span>
        </Link>

        <Link
          to="/portfolio"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
            isActive("/portfolio")
              ? "bg-accent text-white"
              : "text-textmain hover:bg-accent/40"
          }`}
        >
          <FaWallet size={18} />
          <span>Portfolio</span>
        </Link>

      </nav>

      {/* Logout */}
      <div className="mt-auto pt-4 border-t border-textmain/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-textmain hover:bg-danger/20 hover:text-danger transition-colors cursor-pointer"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;