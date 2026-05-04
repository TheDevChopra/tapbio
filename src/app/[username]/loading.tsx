export default function PublicProfileLoading() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-8 animate-pulse">
        {/* Profile Header Skeleton */}
        <div className="text-center flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-muted mb-4"></div>
          <div className="h-8 w-48 bg-muted rounded-md mb-2"></div>
          <div className="h-4 w-64 bg-muted rounded-md"></div>
        </div>

        {/* Links Stack Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-16 bg-muted rounded-xl"></div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="pt-12 text-center flex justify-center">
          <div className="h-4 w-32 bg-muted rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
