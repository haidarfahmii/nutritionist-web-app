"use client";

// src/features/blog/hooks/useCreateBlogForm.ts
"use client";

import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { toast } from "sonner";
import { FormikConfig } from "formik";
import { FormValues, VALID_CATEGORIES } from "@/features/blog/types";
import { createBlogPost } from "@/lib/blog-utils";

/**
 * Validation schema untuk blog post form
 */
const blogSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  imageUrl: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  category: Yup.string()
    .oneOf([...VALID_CATEGORIES], "Invalid category") // Convert readonly to array
    .required("Category is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .max(200, "Description must be less than 200 characters")
    .required("Description is required"),
  content: Yup.string()
    .min(100, "Content must be at least 100 characters")
    .required("Content is required"),
  authorName: Yup.string().required("Author name is required"),
});

/**
 * Hook untuk konfigurasi Formik
 */
export const useCreateBlogConfig = (
  authorName: string,
  authorId: string
): FormikConfig<FormValues> => {
  const router = useRouter();

  const initialValues: FormValues = {
    title: "",
    imageUrl: "",
    category: "Weight Loss Tips", // Use string literal directly
    description: "",
    content: "",
    authorName: authorName,
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await createBlogPost({
        title: values.title,
        imageUrl: values.imageUrl,
        category: values.category,
        description: values.description,
        content: values.content,
        authorId: authorId,
      });

      toast.success("Blog post published successfully!");

      // Redirect dengan small delay untuk user experience
      setTimeout(() => {
        router.push("/blog");
      }, 500);
    } catch (error: any) {
      console.error("Error creating blog post:", error);
      toast.error(
        error.message || "Failed to publish blog post. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    initialValues,
    validationSchema: blogSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
  };
};
