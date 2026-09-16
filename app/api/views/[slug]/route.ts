import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { rateLimitGuard } from '@/lib/api-guard';

// Must match the emoji set offered in components/ReactionBar.tsx
const VALID_REACTIONS = new Set(['🔥', '💡', '👏', '🤯', '❤️']);

async function readCounts(slug: string) {
  const supabase = createServiceClient();
  const [viewsRes, reactionsRes] = await Promise.all([
    supabase.from('blog_views').select('views').eq('slug', slug).maybeSingle(),
    supabase.from('blog_reactions').select('emoji, count').eq('slug', slug),
  ]);

  if (viewsRes.error) console.error('[views] fetch error:', viewsRes.error);
  if (reactionsRes.error) console.error('[views] reactions fetch error:', reactionsRes.error);

  return {
    views: viewsRes.data?.views ?? 0,
    reactions: reactionsRes.data ?? [],
  };
}

// GET — fetch view count + reactions for a slug
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return NextResponse.json(await readCounts(slug));
}

// POST — increment view or reaction
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const limited = rateLimitGuard(req, 30, 60_000); // 30 req/min per IP
  if (limited) return limited;

  const { slug } = await params;
  const supabase = createServiceClient();

  let body: { reaction?: string } = {};
  try {
    body = await req.json();
  } catch {
    /* no body */
  }

  if (body.reaction) {
    if (!VALID_REACTIONS.has(body.reaction)) {
      return NextResponse.json({ error: 'Invalid reaction.' }, { status: 400 });
    }

    const { error } = await supabase.rpc('increment_reaction', {
      post_slug: slug,
      reaction_emoji: body.reaction,
    });
    if (error) {
      console.error('[views] increment_reaction error:', error);
      return NextResponse.json({ error: 'Failed to record reaction.' }, { status: 500 });
    }
  } else {
    const { error } = await supabase.rpc('increment_view', { post_slug: slug });
    if (error) {
      console.error('[views] increment_view error:', error);
      return NextResponse.json({ error: 'Failed to record view.' }, { status: 500 });
    }
  }

  return NextResponse.json(await readCounts(slug));
}
