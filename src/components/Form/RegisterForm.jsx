import React from 'react';
import { Link, Form, useActionData } from "react-router-dom";

function RegisterForm({ loading }) {
  const actionData = useActionData();

  return (
    <Form
      className="flex flex-col max-w-[420px] mx-auto space-y-4"
      action="/register"
      method="post"
    >
      <h1 className="font-bold text-2xl text-neutral-900">
        Create a New Account
      </h1>

      {/* Name Field */}
      <div>
        <label
          className="text-sm text-neutral-600 font-semibold"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
          aria-describedby="name-error"
          placeholder="Enter your name"
          className="w-full mt-1 bg-neutral-50 border border-gray-200 rounded-lg p-3 placeholder:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/80"
        />
        {actionData?.errors?.name && (
          <p id="name-error" className="mt-1 text-xs text-red-500">
            {actionData.errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          className="text-sm text-neutral-600 font-semibold"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          aria-describedby="email-error"
          placeholder="Enter your email"
          className="w-full mt-1 bg-neutral-50 border border-gray-200 rounded-lg p-3 placeholder:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/80"
        />
        {actionData?.errors?.email && (
          <p id="email-error" className="mt-1 text-xs text-red-500">
            {actionData.errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label
          className="text-sm text-neutral-600 font-semibold"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          required
          aria-describedby="password-error"
          placeholder="Create a password"
          className="w-full mt-1 bg-neutral-50 border border-gray-200 rounded-lg p-3 placeholder:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/80"
        />
        {actionData?.errors?.password && (
          <p id="password-error" className="mt-1 text-xs text-red-500">
            {actionData.errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label
          className="text-sm text-neutral-600 font-semibold"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          required
          aria-describedby="confirmPassword-error"
          placeholder="Confirm your password"
          className="w-full mt-1 bg-neutral-50 border border-gray-200 rounded-lg p-3 placeholder:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/80"
        />
        {actionData?.errors?.confirmPassword && (
          <p id="confirmPassword-error" className="mt-1 text-xs text-red-500">
            {actionData.errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Sign Up Button */}
      <button
        disabled={loading}
        className={`flex items-center justify-center w-full rounded-full p-3 font-semibold text-lg transition ${
          loading
            ? "bg-purple-300 cursor-not-allowed"
            : "bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500"
        }`}
        type="submit"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </>
        ) : (
          "Sign Up"
        )}
      </button>

      {actionData?.error && (
        <p className="text-sm text-red-500 text-center">{actionData.error}</p>
      )}

      {/* Sign In Link */}
      <p className="text-gray-600 text-sm font-semibold text-center">
        Already have an account?{" "}
        <Link className="text-teal-500 hover:underline" to="/login">
          Sign In
        </Link>
      </p>
    </Form>
  );
}

export default RegisterForm;