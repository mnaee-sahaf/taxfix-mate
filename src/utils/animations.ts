
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

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

// Confetti animation functions
export const triggerSuccessConfetti = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const colors = ['#9b87f5', '#7E69AB', '#F2FCE2', '#FEF7CD', '#FEC6A1', '#E5DEFF', '#D3E4FD'];

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  (function frame() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) return;
    
    confetti({
      particleCount: 3,
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      origin: { y: 0.6 },
      colors: colors,
      shapes: ['square', 'circle'],
      scalar: randomInRange(0.4, 1)
    });
    
    confetti({
      particleCount: 2,
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      origin: { y: 0.6 },
      colors: colors,
      shapes: ['square', 'circle'],
      scalar: randomInRange(0.4, 1)
    });

    requestAnimationFrame(frame);
  }());
};

export const triggerSuccessfulSubmission = () => {
  // First burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#9b87f5', '#7E69AB', '#F2FCE2', '#FEF7CD', '#FEC6A1', '#E5DEFF', '#D3E4FD']
  });

  // Then start the continuous animation
  setTimeout(() => {
    triggerSuccessConfetti();
  }, 250);
};
