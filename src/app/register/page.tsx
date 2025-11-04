"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CiUser, CiMail, CiLock } from "react-icons/ci";
import { signupValidationSchema } from "@/features/register/schemas/registerValidationSchema";
import useAuthStore from "@/stores/useAuthStores";

export default function RegisterPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const { user } = useAuthStore();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: signupValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setAuthError(null);
      setAuthSuccess(null);
      try {
        await axios.post("/api/auth/register", {
          name: values.name,
          email: values.email,
          password: values.password,
        });
        setAuthSuccess("Registration successful. Please sign in.");
        resetForm();
        setTimeout(() => router.push("/login"), 800);
      } catch (err: any) {
        setAuthError(err?.response?.data?.message || "Registration failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block">
          <img
            src="/assets/images/Left.png"
            alt="auth visual"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 md:p-12">
          <h1 className="text-3xl text-slate-800 font-semibold mb-2">
            Create Account
          </h1>
          <p>{user.email}</p>
          <p className="text-sm text-gray-500 mb-6">
            Use your email and password to sign up
          </p>

          {authSuccess && (
            <div className="text-green-700 bg-green-50 p-3 rounded mb-4">
              {authSuccess}
            </div>
          )}
          {authError && (
            <div className="text-red-700 bg-red-50 p-3 rounded mb-4">
              {authError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

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
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

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
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.password}
                </p>
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
        </div>
      </div>
    </div>
  );
}
