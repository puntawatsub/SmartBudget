import { BrowserRouter, Route, Routes } from "react-router-dom";


import ResetPassword from './components/ResetPasswordPage/ResetPassword'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";

import SignUp from "./pages/SignUpPage/SignUp";
import Login from "./pages/LoginPage/Login";
import ForgotPassword from "./pages/ForgotPasswordPage/ForgotPassword";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Setting from "./pages/SettingPage/Setting";
import Transaction from "./pages/TransactionPage/Transaction";

import ForgotPassword from './pages/ForgotPasswordPage/ForgotPassword'

// import ResetPassword from "./components/ResetPasswordPage/ResetPassword";
import GoalPage from "./components/GoalPage/GoalPage";
import AddGoalPage from "./pages/GoalPage/AddGoalPage"; // ✅ NEW GOAL PAGE

import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Layout wrapper for nested routes */}
          <Route path="/" element={<Layout />}>
            {/* Main site pages */}
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            {/* <Route path="reset-password" element={<ResetPassword />} /> */}
            <Route path='reset-password/:token' element={<ResetPassword />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Setting />} />
            <Route path="transaction" element={<Transaction />} />
            {/* Goals system */}
            <Route path="goals" element={<GoalPage />} /> {/* Goals overview */}
            <Route path="goals/new" element={<AddGoalPage />} />{" "}
            {/* Create new goal */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
