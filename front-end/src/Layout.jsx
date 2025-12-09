import { Input } from "./components/ui/input";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import useRefresh from "./hooks/useRefresh";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  const { pathname } = useLocation();
  //const { error, loading } = useRefresh();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/";

  return (
    <div className="h-screen flex flex-col">
      {/* Auth pages show the top navbar */}
      {isAuthPage ? (
        <nav className="w-full flex items-center justify-between py-4 px-8 shadow-sm bg-white">
          <Link to="/" className="text-xl font-bold">
            logo
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <Link
              to="/signup"
              className="text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Sign up
            </Link>
          </div>
        </nav>
      ) : (
        <header className="bg-white border-b border-gray-200 flex items-center py-3 justify-end px-6">
          <div className="flex items-center gap-4">
            <div className="h-9 bg-white border border-gray-300 rounded-md w-64 shadow-xs"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              AA
            </div>
          </div>
        </header>
      )}

      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
