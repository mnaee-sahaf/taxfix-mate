
import { useEffect, useState } from 'react';

export const useScrollReveal = (threshold = 0.1) => {
  const [revealed, setRevealed] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return { ref: setRef, revealed };
};

export const useLazyImage = (src: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return { imageSrc, isLoading };
};

export const staggeredFadeAnimation = (
  index: number, 
  baseDelay = 100
): React.CSSProperties => {
  return {
    opacity: 0,
    animation: `fade-up 0.5s ease-out forwards`,
    animationDelay: `${baseDelay * index}ms`,
  };
};
