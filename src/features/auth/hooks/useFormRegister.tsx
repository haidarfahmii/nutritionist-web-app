"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { signupValidationSchema } from "../schemas/registerValidationSchema";
import { toast } from "react-toastify";
import { axiosInstance } from "@/utils/axios-instance";

export const useFormRegister = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { confirmPassword, ...registerData } = values;
        const response = await axiosInstance.post(
          "/api/auth/register",
          registerData
        );

        if (response.data.success) {
          toast.success("Registrasi berhasil! Silakan login.");
          router.push("/login");
        } else {
          toast.error(response.data.message || "Registrasi gagal");
        }
      } catch (error: any) {
        toast.error(error.message || "Terjadi kesalahan saat registrasi");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};
