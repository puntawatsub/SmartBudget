import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between py-4 px-8 shadow-sm bg-white">
        {/* later replace with logo */}
        <div className="text-xl font-bold">logo</div>  

        <div className="flex items-center gap-6">
          <Link to="/login" className="text-black px-4 py-2 rounded-md hover:bg-green-800 transition">
            Login
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>
          <Link to="/signup" className=" text-black px-4 py-2 rounded-md hover:bg-green-800 transition">
            Sign up
          </Link>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
          
          </Link>
        </div >

      </nav>
      <main className="px-8 py-6">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
