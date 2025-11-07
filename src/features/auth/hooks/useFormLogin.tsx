import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { loginValidationSchema } from "../schemas/loginValidationSchema";
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "react-toastify";
import { axiosInstance } from "@/utils/axios-instance";

interface LoginFormValues {
  email: string;
  password: string;
}

export const useFormLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();
  const redirectTo = searchParams.get("redirect") || "/";

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axiosInstance.post("/api/auth/login", values);

        if (response.data.success) {
          login(response.data.data);
          toast.success("Login berhasil!");
          router.push(redirectTo);
        } else {
          toast.error(response.data.message || "Login gagal");
        }
      } catch (error: any) {
        toast.error(error.message || "Terjadi kesalahan saat login");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};
