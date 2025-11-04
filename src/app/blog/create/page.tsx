"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import useAuthStore from "@/stores/useAuthStores"; // Gunakan Zustand store
import { CreateBlogForm } from "@/features/blog/components/CreateBlogForm";
import { BlogPostPreview } from "@/features/blog/components/BlogPostPreview";
import { FormValues } from "@/features/blog/hooks/useCreateBlogForm";

export default function CreateBlogPage() {
  const router = useRouter();
  const { user } = useAuthStore(); // Dapatkan user dari Zustand
  const [isClient, setIsClient] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<FormValues | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Cek auth dari Zustand store
    if (!user.objectId) {
      toast.error("Please login to create a blog post");
      router.push("/login");
    }
  }, [user, router]);

  const handlePreview = (values: FormValues) => {
    setPreviewData(values);
    setShowPreview(true);
  };

  if (!isClient || !user.objectId) {
    return (
      <div className="min-h-screen bg-[#F6FBE9] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#234338]" />
      </div>
    );
  }

  return (
    // Hapus LayoutWrapper jika sudah ada di layout global
    <div className="min-h-screen bg-[#F6FBE9] py-12 px-4">
      <Toaster position="top-right" />
      {showPreview && previewData ? (
        // Mode Preview
        <BlogPostPreview
          data={previewData}
          onBack={() => setShowPreview(false)}
        />
      ) : (
        // Mode Form
        <CreateBlogForm
          authorName={user.name} // Kirim nama author dari store
          authorId={user.objectId} // Kirim ID author dari store
          onPreview={handlePreview} // Kirim fungsi preview
          onBack={() => router.push("/blog")} // Tombol kembali
        />
      )}
    </div>
  );
}
