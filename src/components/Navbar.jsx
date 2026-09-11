import { useLocation } from "react-router-dom";

const Navbar = ({ name = "User" }) => {
  const location = useLocation();

  const getPageName = (path) => {
    if (path === "/") return "Marketplace";

    const page = path.replace("/", "").split("/").filter(Boolean)[0];

    if (!page) return "Marketplace";

    return page
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const pageName = getPageName(location.pathname);

  return (
    <div className="flex items-center justify-between h-full px-8">
      {/* Page Name */}
      <h1 className="text-2xl font-medium tracking-wide">{pageName}</h1>

      {/* User Name */}
      <div className="border border-accent px-5 py-2 rounded-xl">
        <span className="text-lg font-normal">{name}</span>
      </div>
    </div>
  );
};

export default Navbar;
