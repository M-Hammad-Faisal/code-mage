import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

// GET — fetch view count + reactions for a slug
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createServiceClient();

  const [viewsRes, reactionsRes] = await Promise.all([
    supabase.from('blog_views').select('views').eq('slug', slug).single(),
    supabase.from('blog_reactions').select('emoji, count').eq('slug', slug),
  ]);

  return NextResponse.json({
    views: viewsRes.data?.views ?? 0,
    reactions: reactionsRes.data ?? [],
  });
}

// POST — increment view or reaction
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createServiceClient();

  let body: { reaction?: string } = {};
  try {
    body = await req.json();
  } catch {
    /* no body */
  }

  if (body.reaction) {
    // Increment reaction
    await supabase.rpc('increment_reaction', {
      post_slug: slug,
      reaction_emoji: body.reaction,
    });
  } else {
    // Increment view
    await supabase.rpc('increment_view', { post_slug: slug });
  }

  // Return updated counts
  const [viewsRes, reactionsRes] = await Promise.all([
    supabase.from('blog_views').select('views').eq('slug', slug).single(),
    supabase.from('blog_reactions').select('emoji, count').eq('slug', slug),
  ]);

  return NextResponse.json({
    views: viewsRes.data?.views ?? 0,
    reactions: reactionsRes.data ?? [],
  });
}
