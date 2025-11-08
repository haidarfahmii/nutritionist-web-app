"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { blogValidationSchema } from "../schemas/blogValidationSchema";
import { toast } from "react-toastify";
import { axiosInstance } from "@/utils/axios-instance";
import Backendless from "@/utils/backendless";
import type { Blog } from "@/lib/types";

interface BlogFormValues {
  title: string;
  image: string;
  imageFile: File | null;
  author: string;
  category: string;
  description: string;
  content: string;
}

export const useFormEditBlog = (blog: Blog) => {
  const router = useRouter();

  const formik = useFormik<BlogFormValues>({
    initialValues: {
      title: blog.title,
      image: blog.image,
      imageFile: null,
      author: blog.author,
      category: blog.category,
      description: blog.description,
      content: blog.content,
    },
    validationSchema: blogValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let imageUrl = values.image;

        // Jika ada file gambar baru yang diupload
        if (values.imageFile) {
          toast.info("Uploading new image...");

          try {
            const file = values.imageFile;
            const filePath = `blog-images/${new Date().getTime()}_${file.name}`;
            const uploadResult = await Backendless.Files.upload(
              file,
              filePath,
              true
            );

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

        const response = await axiosInstance.put(
          `/api/blog/update/${blog.objectId}`,
          blogData
        );

        if (response.data.success) {
          toast.success("Blog berhasil diupdate!");
          router.push(`/blog/${response.data.data.slug}`);
        } else {
          toast.error(response.data.message || "Gagal mengupdate blog");
        }
      } catch (error: any) {
        toast.error(error.message || "Terjadi kesalahan saat mengupdate blog");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};
