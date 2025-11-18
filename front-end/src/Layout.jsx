import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/";

  return (
    <div className="h-screen flex flex-col">
      {isAuthPage ? (
        <nav className="w-full flex items-center justify-between py-4 px-8 shadow-sm bg-white">
          {/* Logo */}
          <Link to={"/"} className="text-xl font-bold">
            logo
          </Link>

          {/* Login and Sign up at right corner */}
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
        <></>
      )}
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
