export default function DashboardLoading() {
  return (
    <>
      <header className="h-16 flex items-center justify-between px-8 border-b border-border bg-background z-10 sticky top-0">
        <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
      </header>
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 min-h-[calc(100vh-4rem)]">
          {/* Left Column Skeleton */}
          <div className="flex flex-col space-y-6 animate-pulse">
            <div className="flex gap-4 border-b border-border pb-3">
              <div className="h-6 w-16 bg-muted rounded"></div>
              <div className="h-6 w-32 bg-muted rounded"></div>
              <div className="h-6 w-24 bg-muted rounded"></div>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 w-full bg-muted rounded-xl"></div>
              ))}
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="hidden lg:flex items-center justify-center bg-muted/20 border border-border rounded-3xl animate-pulse">
            <div className="w-[320px] h-[650px] bg-muted/50 rounded-[3rem] border-[8px] border-background flex flex-col p-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mt-8"></div>
              <div className="h-4 w-32 bg-muted rounded mx-auto"></div>
              <div className="space-y-3 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 w-full bg-muted rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
