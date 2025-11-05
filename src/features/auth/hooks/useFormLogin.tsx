"use client";

import { useFormik } from "formik";
import { loginValidationSchema } from "@/features/login/schemas/loginValidationSchema";
import { axiosInstance } from "@/utils/axios-instance";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuthStore from "@/stores/useAuthStores";

export default function useFormLogin() {
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const { setUser } = useAuthStore();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setAuthError(null);
      setAuthSuccess(null);
      try {
        const response = await axiosInstance.post("/api/auth/login", {
          email: values.email,
          password: values.password,
        });
        // Jika login berhasil

        toast.success(
          response.data.message || "Login berhasil! Mengalihkan..."
        );
        setUser({
          name: response.data.data.name,
          email: response.data.data.email,
          objectId: response.data.data.objectId,
        });
        setTimeout(() => {
          router.push("/");
        }, 800);
      } catch (error: any) {
        toast.error(
          error.response.data.message ||
            "Email atau password salah. Silakan coba lagi."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    formik,
    authError,
    authSuccess,
  };
}
