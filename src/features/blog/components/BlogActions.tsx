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
  const { user } = useAuthStore();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // check user = admin
  const isAdmin = user?.role === "admin";

  // don't show button if not admin
  if (!isAdmin) {
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
        toast.success("Blog has been deleted!");
        router.push("/blog");
        router.refresh();
      } else {
        toast.error(response.data.message || "Failed to delete blog.");
      }
    } catch (error: any) {
      // handle specific error
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to delete this blog.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while deleting the blog."
        );
      }
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
