'use client';

import { useEffect, useRef } from 'react';

export function ViewTracker({ profileId }: { profileId: string }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per mount (React strict mode may mount twice in dev, but in prod it's once)
    // We could use sessionStorage to prevent multiple views in the same session if desired,
    // but for basic analytics, this is sufficient.
    if (hasTracked.current) return;
    hasTracked.current = true;

    fetch('/api/track/view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profileId }),
    }).catch(console.error); // Silently fail
  }, [profileId]);

  return null; // This component renders nothing
}
