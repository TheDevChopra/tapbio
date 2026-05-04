'use client';

export function AnalyticsTab({ blocks, analytics }: { blocks: any[], analytics: { views: number, clicks: Record<string, number> } }) {
  const totalClicks = Object.values(analytics.clicks).reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background border border-border p-6 rounded-2xl flex flex-col justify-center items-center text-center shadow-sm">
          <div className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Total Views</div>
          <div className="text-4xl font-bold">{analytics.views}</div>
        </div>
        <div className="bg-background border border-border p-6 rounded-2xl flex flex-col justify-center items-center text-center shadow-sm">
          <div className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Total Clicks</div>
          <div className="text-4xl font-bold">{totalClicks}</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Link Performance</h3>
        {blocks.length === 0 ? (
          <div className="text-muted-foreground text-center py-8 bg-muted/50 rounded-2xl border border-dashed border-border">
            No links added yet.
          </div>
        ) : (
          <div className="space-y-3">
            {blocks.map((block) => (
              <div key={block.id} className="bg-background border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div className="font-medium truncate mr-4">{block.title}</div>
                <div className="bg-muted px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  {analytics.clicks[block.id] || 0} clicks
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
