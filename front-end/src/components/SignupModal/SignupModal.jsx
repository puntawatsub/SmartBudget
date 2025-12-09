import React from "react";

function SignupModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-blue-50 p-8 rounded-2xl shadow-xl w-96 relative border border-blue-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Sign Up
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-2 text-lg font-semibold transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
