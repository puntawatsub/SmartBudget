import { Input } from "./components/ui/input";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import useRefresh from "./hooks/useRefresh";
import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar";
import logo from "./assets/logo.png";

const Layout = () => {
  const { pathname } = useLocation();
  const { error, loading, isAuth } = useRefresh();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/";

  return (
    <div className="h-screen flex flex-col">
      {/* Auth pages show the top navbar */}
      {isAuthPage ? (
        <nav className="w-full flex items-center justify-between py-4 px-6 shadow-sm bg-white">
          <Link to="/" className="text-xl font-bold">
            <img
              src={logo}
              alt="SmartBudget Logo"
              className="h-7 w-51 object-contain"
            />
          </Link>

          <div className="flex items-center gap-4">
            {/* LOGIC FIX START: Standard ternary operator */}
            {!isAuth ? (
              // IF NOT AUTH: Show Login & Signup
              <>
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
              </>
            ) : (
              // ELSE (IS AUTH): Show Dashboard only
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition"
              >
                Dashboard
              </Link>
            )}
            {/* LOGIC FIX END */}
          </div>
        </nav>
      ) : (
        <></>
      )}

      <div className="flex flex-row">
        {isAuth && <Sidebar />}
        {/* Main content */}
        <main className={`flex-1 overflow-auto ${isAuth && "ml-60"}`}>
          <Outlet />
        </main>
      </div>
      <div className={isAuth && "ml-60"}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
