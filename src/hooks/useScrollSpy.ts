// src/hooks/useScrollSpy.ts
import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in the viewport center.
 * @param sectionIds - MUST be referentially stable (module-level constant or useMemo).
 *   Passing an inline array literal causes observers to re-register on every render.
 */
export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [sectionIds]);

  return activeId;
}
