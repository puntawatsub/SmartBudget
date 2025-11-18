import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import SignUp from "./components/SignUpPage/SignUp";
import Login from "./components/LoginPage/Login";
import ForgotPassword from "./components/ForgotPasswordPage/ForgotPassword";
import ResetPassword from "./components/ResetPasswordPage/ResetPassword";
import "./index.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
