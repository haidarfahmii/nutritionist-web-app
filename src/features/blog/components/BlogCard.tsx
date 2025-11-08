"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Calendar, User } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  image: string;
  author: string;
  description: string;
  category: string;
  created?: number;
}

export function BlogCard({
  slug,
  title,
  image,
  author,
  description,
  category,
  created,
}: BlogCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="flex-1">
        <div className="mb-2">
          <Badge variant="secondary">{category}</Badge>
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {author}
          </span>
          {created && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(new Date(created))}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {description}
        </p>
        <Link href={`/blog/${slug}`}>
          <Button variant="link" className="p-0 h-auto cursor-pointer">
            Read More →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
