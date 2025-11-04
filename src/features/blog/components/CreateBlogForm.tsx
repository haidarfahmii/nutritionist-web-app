"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "motion/react";
import { ArrowLeft, Eye, Send, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ImageWithFallback";

import {
  useCreateBlogConfig,
  FormValues,
} from "@/features/blog/hooks/useCreateBlogForm";
import { CATEGORIES } from "@/lib/blog-utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface CreateBlogFormProps {
  authorName: string;
  authorId: string;
  onPreview: (values: FormValues) => void;
  onBack: () => void;
}

export function CreateBlogForm({
  authorName,
  authorId,
  onPreview,
  onBack,
}: CreateBlogFormProps) {
  // Panggil hook-nya di sini
  const formikConfig = useCreateBlogConfig(authorName, authorId);

  return (
    <div className="container mx-auto max-w-3xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <Button onClick={onBack} variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Create New Blog Post</CardTitle>
              <CardDescription>
                Share your knowledge and insights with the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 2. Spread config ke <Formik> */}
              <Formik {...formikConfig}>
                {/* 3. Tambahkan render prop (ini yang hilang) */}
                {({ values, isSubmitting, errors, touched }) => (
                  <Form className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Field
                        as={Input}
                        id="title"
                        name="title"
                        placeholder="Enter an engaging blog title"
                        className={
                          errors.title && touched.title
                            ? "border-destructive"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="title"
                        component="p"
                        className="text-sm text-destructive"
                      />
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Image URL *</Label>
                      <Field
                        as={Input}
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className={
                          errors.imageUrl && touched.imageUrl
                            ? "border-destructive"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="imageUrl"
                        component="p"
                        className="text-sm text-destructive"
                      />
                      {values.imageUrl && !errors.imageUrl && (
                        <div className="mt-2 relative h-48 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={values.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Field
                        as="select"
                        id="category"
                        name="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="p"
                        className="text-sm text-destructive"
                      />
                    </div>

                    {/* Author Name */}
                    <div className="space-y-2">
                      <Label htmlFor="authorName">Author Name *</Label>
                      <Field
                        as={Input}
                        id="authorName"
                        name="authorName"
                        disabled
                        className={
                          errors.authorName && touched.authorName
                            ? "border-destructive"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="authorName"
                        component="p"
                        className="text-sm text-destructive"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Summary / Excerpt *</Label>
                      <Field
                        as={Textarea}
                        id="description"
                        name="description"
                        placeholder="Write a brief summary... (20-200 characters)"
                        rows={3}
                        className={
                          errors.description && touched.description
                            ? "border-destructive"
                            : ""
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        {values.description.length}/200 characters
                      </p>
                      <ErrorMessage
                        name="description"
                        component="p"
                        className="text-sm text-destructive"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <Label htmlFor="content">Content *</Label>
                      <Field
                        as={Textarea}
                        id="content"
                        name="content"
                        placeholder="Write your blog content here..."
                        rows={12}
                        className={
                          errors.content && touched.content
                            ? "border-destructive"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="content"
                        component="p"
                        className="text-sm text-destructive"
                      />
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex gap-4 flex-col sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => onPreview(values)}
                        className="flex-1 border-[#CBEA7B] text-[#234338] hover:bg-[#CBEA7B]"
                        disabled={Object.keys(errors).length > 0}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>

                      <Button
                        type="submit"
                        className="flex-1 bg-[#CBEA7B] text-[#234338] hover:bg-[#B8D96D]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Publishing...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Publish
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
