import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import useRefresh from "./hooks/useRefresh";
import { useEffect } from "react";
import Footer from "./components/Footer/Footer";

const Layout = () => {
  const { pathname } = useLocation();
  const { error, loading } = useRefresh();

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
        // Non-auth pages get a minimal top bar
        <div className="w-full bg-white h-16 border-b shadow-sm"></div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
