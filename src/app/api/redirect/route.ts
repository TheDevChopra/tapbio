import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blockId = searchParams.get("blockId");

  if (!blockId) {
    return new NextResponse("Missing blockId", { status: 400 });
  }

  const supabase = await createClient();

  // 1. Fetch the block to get URL and profile ID (user_id)
  const { data: block, error: blockError } = await supabase
    .from('blocks')
    .select('url, user_id')
    .eq('id', blockId)
    .single();

  if (blockError || !block) {
    console.error("Error fetching block for redirect:", blockError);
    return new NextResponse("Block not found", { status: 404 });
  }

  // 2. Track the click asynchronously (fire and forget pattern if possible, but edge runtime is tricky. We'll await it to be safe)
  const { error: trackError } = await supabase
    .from('analytics_events')
    .insert({
      profile_id: block.user_id, // profile_id is same as user_id
      block_id: blockId,
      event_type: 'click',
    });

  if (trackError) {
    console.error("Error tracking click:", trackError);
    // Even if tracking fails, we still redirect the user
  }

  // 3. Redirect to the actual URL
  // Ensure the URL is absolute
  let destinationUrl = block.url;
  if (!destinationUrl.startsWith('http://') && !destinationUrl.startsWith('https://')) {
    destinationUrl = `https://${destinationUrl}`;
  }

  return NextResponse.redirect(destinationUrl);
}
