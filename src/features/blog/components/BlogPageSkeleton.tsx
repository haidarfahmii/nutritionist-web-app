export function BlogPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#F6FBE9]">
      {/* Category Filter Skeleton */}
      <div className="bg-[#234338] py-4 px-4 mb-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-32 bg-white/10 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="h-12 bg-white rounded-lg animate-pulse" />
      </div>

      {/* Blog Grid Skeleton */}
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 pb-12">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="h-48 md:h-56 bg-gray-200 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex gap-4">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
