import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";

import SignUp from "./pages/SignUpPage/SignUp";
import Login from "./pages/LoginPage/Login";
import ForgotPassword from "./pages/ForgotPasswordPage/ForgotPassword";
import Dashboard from "./pages/DashboardPage/Dashboard";

import ResetPassword from "./components/ResetPasswordPage/ResetPassword";
import GoalPage from "./components/GoalPage/GoalPage";
import AddGoalPage from "./pages/GoalPage/AddGoalPage";

import "./index.css";
import useRefresh from "./hooks/useRefresh";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="goals" element={<GoalPage />} />
            <Route path="goals/new" element={<AddGoalPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
