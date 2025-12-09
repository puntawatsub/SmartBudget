import { Link, useNavigate } from "react-router-dom";

import homeIcon from "@/assets/homeIcon.svg";
import dashboardIcon from "@/assets/dashboardIcon.svg";
import goalsIcon from "@/assets/goalsIcon.svg";
import transactionsIcon from "@/assets/transactionsIcon.svg";
import settingsIcon from "@/assets/settingsIcon.svg";
import logoutIcon from "@/assets/logoutIcon.svg";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/api/signups/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // clear client auth/cache
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      localStorage.removeItem("appSettings");
      navigate("/");
    }
  };

  return (
    <div className="w-40 bg-white dark:bg-gray-800 border-r border-t dark:border-gray-700 h-screen p-4 flex flex-col justify-between">
      <div className="space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <img
            src={homeIcon}
            className="w-6 h-6 dark:invert dark:brightness-150"
            alt="Home"
          />
          <span className="text-sm font-medium dark:text-white">Home</span>
        </Link>

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <img
            src={dashboardIcon}
            className="w-6 h-6 dark:invert dark:brightness-150"
            alt="Dashboard"
          />
          <span className="text-sm font-medium dark:text-white">Dashboard</span>
        </Link>

        <Link
          to="/goals"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <img
            src={goalsIcon}
            className="w-6 h-6 dark:invert dark:brightness-150"
            alt="Goals"
          />
          <span className="text-sm font-medium dark:text-white">Goals</span>
        </Link>

        <Link
          to="/transaction"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <img
            src={transactionsIcon}
            className="w-6 h-6 dark:invert dark:brightness-150"
            alt="Transactions"
          />
          <span className="text-sm font-medium dark:text-white">
            Transaction
          </span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <img
            src={settingsIcon}
            className="w-6 h-6 dark:invert dark:brightness-150"
            alt="Settings"
          />
          <span className="text-sm font-medium dark:text-white">Settings</span>
        </Link>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-left"
      >
        <img
          src={logoutIcon}
          className="w-6 h-6 dark:invert dark:brightness-150"
          alt="Logout"
        />
        <span className="text-sm font-medium dark:text-white">Logout</span>
      </button>
    </div>
  );
}
