"use client";

import { Suspense } from "react";
import { BlogListClient } from "./BlogListClient";
import { Loader2 } from "lucide-react";

function BlogLoadingFallback() {
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    </section>
  );
}

export function BlogListWrapper() {
  return (
    <Suspense fallback={<BlogLoadingFallback />}>
      <BlogListClient />
    </Suspense>
  );
}
