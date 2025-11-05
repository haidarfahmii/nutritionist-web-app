"use client";

import { CiMail, CiLock } from "react-icons/ci";
import useFormLogin from "@/features/login/hooks/useFormLogin";
import { useState } from "react";

export default function FormLogin() {
  const { formik, authError, authSuccess } = useFormLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* EMAIL */}
      <div>
        <label className="sr-only">Email</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <CiMail />
          </span>
          <input
            name="email"
            type="email"
            placeholder="Your email address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full pl-10 py-3 text-slate-800 border-b border-gray-200 focus:outline-none"
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <label className="sr-only">Password</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <CiLock />
          </span>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full pl-10 py-3 text-slate-800 border-b border-gray-200 focus:outline-none"
          />
          <button
            type="button"
            aria-label="toggle password"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* REMEMBER & FORGOT */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-gray-600">Remember me</span>
        </label>
        <a href="#" className="text-emerald-500">
          Forgot password?
        </a>
      </div>

      {/* SUCCESS MESSAGE */}
      {authSuccess && (
        <div className="text-green-700 bg-green-50 p-3 rounded">
          {authSuccess}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {authError && (
        <div className="text-red-700 bg-red-50 p-3 rounded">{authError}</div>
      )}

      {/* BUTTON SUBMIT */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full bg-black text-white disabled:opacity-50 py-3 rounded-md mt-3"
      >
        {formik.isSubmitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
