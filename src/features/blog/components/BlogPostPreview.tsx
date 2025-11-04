"use client";

import { motion } from "motion/react";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { FormValues } from "@/features/blog/hooks/useCreateBlogForm";
import { fadeInUp } from "@/lib/animations";
import { formatDate } from "@/lib/utils";

interface BlogPostPreviewProps {
  data: FormValues;
  onBack: () => void;
}

export function BlogPostPreview({ data, onBack }: BlogPostPreviewProps) {
  return (
    <div className="container mx-auto max-w-4xl">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <Button onClick={onBack} variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Edit
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              This is how your blog post will appear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <article className="space-y-6">
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={data.imageUrl}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge className="bg-[#CBEA7B] text-[#234338]">
                {data.category}
              </Badge>
              <h1>{data.title}</h1>
              <p className="text-muted-foreground">{data.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600 pt-2 border-t">
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>{data.authorName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(Date.now())}</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{data.content}</p>
              </div>
            </article>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
