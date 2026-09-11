import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-mainBG text-textmain">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="ml-72 min-h-screen">
        {/* Navbar */}
        <header className="h-20">
          <Navbar />
        </header>

        {/* Page content */}
        <main className="px-8 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;