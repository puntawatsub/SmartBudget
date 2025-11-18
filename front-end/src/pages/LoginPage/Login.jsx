import { Link } from "react-router-dom";
import { useState } from "react";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="px-10 py-20 rounded-3xl border-2 border-gray-200 flex items-center justify-center ">
      <div className="mt-8 bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        <h2 className="text-5xl  font-semibold mb-6 text-center ">
          Log in
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              
            />
          </div>

          {/* Password with Forgot Password Link */}
          <div>
            <div className="flex justify-end mb-2">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-2 border-gray-100 rounded-xl p-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Log in
          </button>
          </div>
          
        </form>

        {/* Footer Link */}
        <p className="mt-4 text-center text-sm mt-6 text-gray-600">
          No account? Create a new account{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
