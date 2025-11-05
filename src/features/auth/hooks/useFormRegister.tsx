"use client";

"use client";

import { useFormik } from "formik";
import { signupValidationSchema } from "@/features/auth/schemas/registerValidationSchema";
import { axiosInstance } from "@/utils/axios-instance"; // Gunakan axiosInstance agar konsisten
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Gunakan toast agar konsisten dengan login

export default function useFormRegister() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: signupValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axiosInstance.post("/api/auth/register", {
          name: values.name,
          email: values.email,
          password: values.password,
        });

        toast.success(
          response.data.message || "Registrasi berhasil. Silakan login."
        );
        resetForm();
        setTimeout(() => router.push("/login"), 800);
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message || "Registrasi gagal, coba lagi."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    formik,
  };
}
