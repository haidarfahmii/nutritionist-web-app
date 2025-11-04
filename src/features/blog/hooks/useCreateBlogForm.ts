"use client";

import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { toast } from "sonner";
import axios from "axios";
import { CATEGORIES } from "@/lib/blog-utils";

// Definisikan tipe form di sini
export interface FormValues {
  title: string;
  imageUrl: string;
  category: string;
  description: string;
  content: string;
  authorName: string;
}

// Skema validasi (bisa dipindahkan ke file schemas/ terpisah)
const blogSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  imageUrl: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .max(200, "Description must be less than 200 characters")
    .required("Description is required"),
  content: Yup.string()
    .min(100, "Content must be at least 100 characters")
    .required("Content is required"),
  authorName: Yup.string().required("Author name is required"),
});

// Ganti nama hook menjadi useCreateBlogConfig
export const useCreateBlogConfig = (authorName: string, authorId: string) => {
  const router = useRouter(); // Hook router tetap diperlukan

  const initialValues: FormValues = {
    title: "",
    imageUrl: "",
    category: CATEGORIES[1], // Default ke kategori pertama (bukan "All")
    description: "",
    content: "",
    authorName: authorName,
  };

  // Definisikan handler submit
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await axios.post("/api/blog/create", {
        ...values,
        authorId: authorId,
      });

      toast.success("Blog post published successfully!");
      router.push("/blog");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to publish blog post. Please try again."
      );
      console.error("Error creating blog post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Kembalikan objek KONFIGURASI, bukan hasil hook useFormik
  return {
    initialValues,
    validationSchema: blogSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  };
};
