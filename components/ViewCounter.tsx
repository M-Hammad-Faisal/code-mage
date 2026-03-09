'use client';

import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Fire view increment + fetch updated count
    fetch(`/api/views/${slug}`, { method: 'POST' })
      .then((r) => r.json())
      .then((d) => setViews(d.views ?? null))
      .catch(() => null);
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
      <Eye className="w-3 h-3" />
      {views.toLocaleString()} views
    </span>
  );
}
