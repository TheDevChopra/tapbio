import { createClient } from "@/utils/supabase/server";
import { LivePreview } from "@/components/LivePreview";
import { DashboardTabs } from "@/components/DashboardTabs";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: blocks } = await supabase
    .from('blocks')
    .select('*')
    .eq('user_id', user.id)
    .order('sort_order', { ascending: true });

  const { data: events } = await supabase
    .from('analytics_events')
    .select('event_type, block_id')
    .eq('profile_id', user.id);

  const analytics = { views: 0, clicks: {} as Record<string, number> };
  if (events) {
    events.forEach(event => {
      if (event.event_type === 'view') {
        analytics.views += 1;
      } else if (event.event_type === 'click' && event.block_id) {
        analytics.clicks[event.block_id] = (analytics.clicks[event.block_id] || 0) + 1;
      }
    });
  }

  return (
    <>
      <header className="h-16 flex items-center justify-between px-8 border-b border-border bg-background z-10 sticky top-0">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 min-h-[calc(100vh-4rem)]">
          {/* Left Column: Editor & Settings */}
          <div className="flex flex-col">
            <DashboardTabs blocks={blocks || []} profile={profile || {}} analytics={analytics} />
          </div>

          {/* Right Column: Live Preview */}
          <div className="hidden lg:block bg-muted/20 border border-border rounded-3xl overflow-y-auto">
            <LivePreview username={profile?.username || ''} />
          </div>
        </div>
      </div>
    </>
  );
}

