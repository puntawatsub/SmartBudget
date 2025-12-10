import { Input } from "./components/ui/input";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import useRefresh from "./hooks/useRefresh";
import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar";

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
        <nav className="w-full flex items-center justify-between py-4 px-8 shadow-sm bg-white dark:bg-gray-900">
          <Link to="/" className="text-xl font-bold text-black dark:text-white">
            logo
          </Link>

          <div className="flex items-center gap-4">
            {!isAuth ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition"
                >
                  Login
                </Link>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition"
              >
                Dashboard
              </Link>
            )}
          </div>
        </nav>
      ) : (
        // <header className="bg-white border-b border-gray-200 flex items-center py-3 justify-end px-6">
        //   <div className="flex items-center gap-4">
        //     <div className="h-9 bg-white border border-gray-300 rounded-md w-64 shadow-xs"></div>
        //     <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
        //       AA
        //     </div>
        //   </div>
        // </header>
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
