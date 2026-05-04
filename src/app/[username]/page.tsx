import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ViewTracker } from "@/components/ViewTracker";
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, username, bio, avatar_url")
    .eq("username", resolvedParams.username)
    .single();

  if (!profile) {
    return { title: 'User Not Found' };
  }

  const title = profile.full_name ? `${profile.full_name} (@${profile.username})` : `@${profile.username}`;
  const description = profile.bio || `Check out ${title}'s TapBio.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: profile.avatar_url ? [profile.avatar_url] : [],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: profile.avatar_url ? [profile.avatar_url] : [],
    },
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", resolvedParams.username)
    .single();

  if (!profile || error) {
    notFound();
  }

  const { data: blocks } = await supabase
    .from("blocks")
    .select("*")
    .eq("user_id", profile.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>;
      case 'payment':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
      case 'booking':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;
      case 'map':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
    }
  }

  return (
    <div data-theme={profile.theme} data-accent={profile.accent_color} className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <ViewTracker profileId={profile.id} />
      <div className="max-w-xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-muted border border-border overflow-hidden mb-4 relative flex items-center justify-center">
            {profile.avatar_url ? (
              <Image 
                src={profile.avatar_url} 
                alt={`@${profile.username}`} 
                fill 
                priority={true}
                sizes="(max-width: 96px) 100vw, 96px"
                className="object-cover"
              />
            ) : (
              <div className="text-muted-foreground text-3xl font-bold bg-muted">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold">{profile.full_name || `@${profile.username}`}</h1>
          <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
            {profile.bio || "Welcome to my TapBio. This is a minimal public profile built for conversions."}
          </p>
        </div>

        {/* Links Stack */}
        <div className="space-y-4">
          {blocks && blocks.length > 0 ? (
            blocks.map((block) => (
              <a key={block.id} href={`/api/redirect?blockId=${block.id}`} target="_blank" rel="noopener noreferrer" className="block w-full group">
                <div className="w-full bg-background border border-border p-4 rounded-xl flex items-center font-medium hover:bg-muted hover:scale-[1.02] transition-all duration-200 shadow-sm">
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors mr-3">
                    {getBlockIcon(block.type)}
                  </div>
                  <div className="flex-1 text-center pr-8">
                    {block.title}
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No links added yet.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-12 text-center">
          <Link href="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-foreground rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-background rounded-full" />
            </div>
            Create your own TapBio
          </Link>
        </div>
      </div>
    </div>
  );
}
