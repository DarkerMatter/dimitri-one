// src/hooks/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>({ threshold = 0, rootMargin = '0px' }: Options = {}) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsIntersecting(true); // fire once
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isIntersecting };
}
