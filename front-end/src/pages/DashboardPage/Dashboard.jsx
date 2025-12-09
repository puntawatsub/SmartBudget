import React, { useEffect, useState } from "react";
import AnalyticalOverview from "./AnalyticalOverview.jsx";
import ExpenditureOverview from "../DashboardPage/ExpenditureOverview.jsx";
import GoalCard from "../DashboardPage/GoalCard";
import UpcomingBills from "../DashboardPage/UpcomingBills";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Get user name from sessionStorage first
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Try to get username from stored user data
        setUserName(parsedUser.username || parsedUser.name || "User");
      } catch (err) {
        console.error("Failed to parse stored user data:", err);
      }
    }

    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData(json);
        
        // Also try to get user name from API response as fallback
        if (json.user && json.user.name) {
          setUserName(json.user.name);
        }
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    const fetchGoals = async () => {
      try {
        const res = await fetch("/api/goals", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error();
        const goalsData = await res.json();
        setGoals(goalsData);
      } catch (err) {
        console.error("Failed to load goals:", err);
      }
    };

    fetchDashboard();
    fetchGoals();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="text-2xl font-semibold text-gray-800">Hi, {userName} 👋</div>

      <AnalyticalOverview data={data} />

      {data?.expenditureOverview && (
        <ExpenditureOverview data={data.expenditureOverview} />
      )}

      {/* Goals Section Container */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Goals</h2>
        
        <div className="flex flex-row gap-6">
          {goals.slice(0, 3).map((goal) => (
            <GoalCard key={goal._id} data={goal} />
          ))}
        </div>

        {goals.length > 3 && (
          <div className="flex justify-center mt-6">
            <a
              href="/goals"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View More Goals
            </a>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingBills data={data.upcomingBills} />
      </div>

    </div>
  );  
};     

export default Dashboard;
