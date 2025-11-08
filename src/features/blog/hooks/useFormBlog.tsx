"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { blogValidationSchema } from "../schemas/blogValidationSchema";
import { toast } from "react-toastify";
// import { axiosInstance } from "@/utils/axios-instance";
import Backendless from "@/utils/backendless";
import { generateSlug } from "@/lib/utils";

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

        // Generate slug dari title
        const slug = generateSlug(values.title);

        const blogData = {
          slug,
          title: values.title,
          image: imageUrl,
          author: values.author,
          category: values.category,
          description: values.description,
          content: values.content,
        };

        const savedBlog = await Backendless.Data.of("Blogs").save(blogData);

        if (savedBlog) {
          toast.success("Blog berhasil dipublikasikan!");

          // delay kecil sebelum redirect untuk memastikan data tersimpan
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Redirect ke halaman blog detail
          router.push(`/blog/${slug}`);

          // Refresh router untuk memuat ulang data
          router.refresh();
        } else {
          toast.error("Gagal membuat blog");
        }
      } catch (error: any) {
        console.error("Error creating blog:", error);
        toast.error(error.message || "Terjadi kesalahan saat membuat blog");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};
