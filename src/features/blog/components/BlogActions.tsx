"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "react-toastify";
import { axiosInstance } from "@/utils/axios-instance";
import type { Blog } from "@/lib/types";

interface BlogActionsProps {
  blog: Blog;
}

export function BlogActions({ blog }: BlogActionsProps) {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hanya admin yang bisa edit/delete
  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  const handleEdit = () => {
    router.push(`/blog/edit/${blog.slug}`);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await axiosInstance.delete(
        `/api/blog/delete/${blog.objectId}`
      );

      if (response.data.success) {
        toast.success("Blog berhasil dihapus!");
        router.push("/blog");
      } else {
        toast.error(response.data.message || "Gagal menghapus blog");
      }
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan saat menghapus blog");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleEdit}
          className="cursor-pointer"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
          className="cursor-pointer"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              blog post "{blog.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
