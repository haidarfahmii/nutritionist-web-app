"use client";

import { useState, useRef, useEffect } from "react";
import { useFormEditBlog } from "../hooks/useFormEditBlog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Eye, Save, Upload, ArrowLeft } from "lucide-react";
import type { Blog } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";

const categories = [
  "Diet & Nutrition",
  "Weight Loss",
  "Healthy Recipes",
  "Fitness & Exercise",
  "Lifestyle",
  "Supplements",
  "Wellness Tips",
];

interface FormEditBlogProps {
  blog: Blog;
}

export function FormEditBlog({ blog }: FormEditBlogProps) {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const formik = useFormEditBlog(blog);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check authentication and authorization
  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/blog");
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Edit Blog Post</CardTitle>
              <CardDescription>Update your blog post content</CardDescription>
            </div>
            <Link href={`/blog/${blog.slug}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter blog title"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-sm text-destructive">
                  {formik.errors.title}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image">Image *</Label>
              <Input
                id="image"
                type="url"
                placeholder="https://example.com/image.jpg"
                name="image"
                value={formik.values.image}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue("imageFile", null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              />

              <p className="text-sm text-muted-foreground text-center my-2">
                OR
              </p>

              {/* tombol input file */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload new image
              </Button>

              {/* input file tersembunyi */}
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    formik.setFieldValue("imageFile", file);
                    formik.setFieldValue("image", URL.createObjectURL(file));
                  } else {
                    formik.setFieldValue("imageFile", null);
                  }
                }}
              />

              {formik.touched.image && formik.errors.image && (
                <p className="text-sm text-destructive">
                  {formik.errors.image}
                </p>
              )}

              {formik.values.image && (
                <div className="mt-2">
                  <Image
                    src={formik.values.image}
                    alt="Preview"
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                type="text"
                placeholder="Your name"
                {...formik.getFieldProps("author")}
              />
              {formik.touched.author && formik.errors.author && (
                <p className="text-sm text-destructive">
                  {formik.errors.author}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formik.values.category}
                onValueChange={(value) =>
                  formik.setFieldValue("category", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <p className="text-sm text-destructive">
                  {formik.errors.category}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your blog post (20-500 characters)"
                rows={3}
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-sm text-destructive">
                  {formik.errors.description}
                </p>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                placeholder="Write your blog content here (minimum 100 characters)"
                rows={10}
                {...formik.getFieldProps("content")}
              />
              {formik.touched.content && formik.errors.content && (
                <p className="text-sm text-destructive">
                  {formik.errors.content}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPreview(true)}
                disabled={!formik.values.title && !formik.values.content}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                {formik.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {formik.values.image && (
              <Image
                src={formik.values.image}
                alt={formik.values.title}
                width={400}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            {formik.values.title && <h2>{formik.values.title}</h2>}
            <div className="flex gap-4 text-sm text-muted-foreground">
              {formik.values.author && <span>By {formik.values.author}</span>}
              {formik.values.category && (
                <span>• {formik.values.category}</span>
              )}
            </div>
            {formik.values.description && (
              <p className="text-muted-foreground">
                {formik.values.description}
              </p>
            )}
            {formik.values.content && (
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{formik.values.content}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
