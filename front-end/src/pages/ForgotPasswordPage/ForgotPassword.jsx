import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Password reset requested for:", email);
    alert("If this email is registered, a reset link has been sent.");
    setEmail("");
  };

  return (
    <div className="flex flex-row h-full overflow-hidden">
      <div className="flex-1 relative overflow-hidden h-full not-xl:hidden">
        <div className="w-[794px] h-[546px] left-[-149px] bottom-[-272px] absolute bg-[conic-gradient(from_180deg_at_50.00%_50.00%,#B9C9DA_0deg,#ECEAED_360deg)] rounded-full blur-[150px]" />
        <div className="w-[854px] h-[591px] left-[-27px] top-[-273px] absolute bg-[conic-gradient(from_180deg_at_50.00%_50.00%,#B9C9DA_0deg,#ECEAED_360deg)] rounded-full blur-[150px]" />
        <div className="w-full left-0 top-[302px] absolute flex flex-col px-4">
          <div className="text-black text-5xl italic font-bold font-['Inter']">
            Your Money Your Rules
          </div>
          <div className="text-blue-400 mt-3 text-6xl italic font-bold font-['Inter']">
            SMART BUDGET
          </div>
          <div className="text-neutral-400 mt-6 text-xl font-medium font-['Inter'] pr-20 text-wrap">
            With SmartBudget, managing your finances has never been easier.
            Start tracking, planning, and achieving your financial goals today
          </div>
        </div>
      </div>

      <div className="px-10 flex-2 py-20 flex items-center sm:justify-center z-10 flex-col overflow-y-auto">
        <div className="xl:hidden max-sm:hidden">
          <div className="text-black text-3xl italic font-bold font-['Inter']">
            Your Money Your Rules
          </div>
          <div className="text-blue-400 mt-3 text-4xl italic font-bold font-['Inter']">
            SMART BUDGET
          </div>
        </div>

        <div className="sm:mt-8 sm:bg-white sm:p-8 sm:rounded-[20px] sm:shadow-sm sm:border sm:border-gray-300 w-full">
          <h2 className="text-[1.5rem] font-semibold mb-6 capitalize">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit} className="mt-11">
            <div className="mb-9">
              <Input
                type="email"
                autoComplete="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>

            <div className="mt-14 flex flex-col">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.75 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
              >
                Send Reset Link
              </button>
            </div>
          </form>

          <p className="mt-10.5 text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
