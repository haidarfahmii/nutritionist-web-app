"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { blogValidationSchema } from "../schemas/blogValidationSchema";
import { toast } from "react-toastify";
import { axiosInstance } from "@/utils/axios-instance";
import Backendless from "@/utils/backendless";

interface BlogFormValues {
  title: string;
  image: string;
  imageFile: File | null;
  author: string;
  category: string;
  description: string;
  content: string;
}

export const useFormBlog = () => {
  const router = useRouter();

  const formik = useFormik<BlogFormValues>({
    initialValues: {
      title: "",
      image: "",
      imageFile: null,
      author: "",
      category: "",
      description: "",
      content: "",
    },
    validationSchema: blogValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let imageUrl = values.image;

        if (values.imageFile) {
          toast.info("Uploading image...");

          try {
            const file = values.imageFile;
            const filePath = `blog-images/${new Date().getTime()}_${file.name}`;
            const uploadResult = await Backendless.Files.upload(
              file,
              filePath,
              true
            );

            // dapatkan URL publik file yang di unggah
            imageUrl = uploadResult.fileURL;
            toast.success("Image uploaded successfully!");
          } catch (uploadError: any) {
            console.error("Image upload failed:", uploadError);
            toast.error(uploadError.message || "Failed to upload image");
            setSubmitting(false);
            return;
          }
        }

        const blogData = {
          title: values.title,
          image: imageUrl,
          author: values.author,
          category: values.category,
          description: values.description,
          content: values.content,
        };

        const response = await axiosInstance.post("/api/blog/create", blogData);

        if (response.data.success) {
          toast.success("Blog berhasil dipublikasikan!");
          router.push("/blog");
        } else {
          toast.error(response.data.message || "Gagal membuat blog");
        }
      } catch (error: any) {
        toast.error(error.message || "Terjadi kesalahan saat membuat blog");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};
