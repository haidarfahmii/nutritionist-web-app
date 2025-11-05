"use client";

import { CiUser, CiMail, CiLock } from "react-icons/ci";
import useFormRegister from "@/features/auth/hooks/useFormRegister";

export default function FormRegister() {
  // Semua logika kini ada di dalam hook ini
  const { formik } = useFormRegister();

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* Kita tidak perlu lagi menampilkan state authSuccess/authError di sini,
        karena 'toast' (sonner) akan menanganinya secara otomatis.
      */}

      {/* NAME */}
      <div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <CiUser />
          </span>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="w-full pl-10 py-3 text-slate-600 border-b border-gray-200 focus:outline-none"
          />
        </div>
        {formik.touched.name && formik.errors.name && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <CiMail />
          </span>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full pl-10 py-3 text-slate-600 border-b border-gray-200 focus:outline-none"
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <CiLock />
          </span>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full pl-10 py-3 text-slate-600 border-b border-gray-200 focus:outline-none"
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="w-4 h-4" />
        <span className="text-gray-600">
          I agree with{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </span>
      </label>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full bg-black text-white py-3 rounded-md mt-3"
      >
        {formik.isSubmitting ? "Signing up..." : "Sign Up"}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-emerald-500">
          Sign in
        </a>
      </p>
    </form>
  );
}
