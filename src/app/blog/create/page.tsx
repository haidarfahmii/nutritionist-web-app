"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import useAuthStore from "@/stores/useAuthStores";
import { CreateBlogForm } from "@/features/blog/components/CreateBlogForm";
import { BlogPostPreview } from "@/features/blog/components/BlogPostPreview";
import { FormValues } from "@/features/blog/types";

export default function CreateBlogPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<FormValues | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check auth after client mount
  useEffect(() => {
    if (isClient && !user.objectId) {
      toast.error("Please login to create a blog post");
      router.push("/login");
    }
  }, [isClient, user.objectId, router]);

  const handlePreview = (values: FormValues) => {
    setPreviewData(values);
    setShowPreview(true);
  };

  const handleBackToEdit = () => {
    setShowPreview(false);
  };

  const handleBackToBlog = () => {
    router.push("/blog");
  };

  // Show loading state while checking auth
  if (!isClient || !user.objectId) {
    return (
      <div className="min-h-screen bg-[#F6FBE9] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#234338] mx-auto mb-2" />
          <p className="text-[#234338]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6FBE9] py-12 px-4">
      {showPreview && previewData ? (
        <BlogPostPreview data={previewData} onBack={handleBackToEdit} />
      ) : (
        <CreateBlogForm
          authorName={user.name}
          authorId={user.objectId}
          onPreview={handlePreview}
          onBack={handleBackToBlog}
        />
      )}
    </div>
  );
}
