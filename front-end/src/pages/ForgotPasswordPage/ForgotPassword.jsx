import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger password reset logic here (e.g., API call)
    console.log('Password reset requested for:', email);
    alert('If this email is registered, a reset link has been sent.');
    setEmail('');
  };

  return (
    <div className="px-10 py-20 rounded-3xl border-2 border-gray-200 flex items-center justify-center">
      <div className="mt-8 bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-5xl font-semibold mb-6 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-10 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Remembered your password?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
