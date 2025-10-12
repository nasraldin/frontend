import { createEffect, createSignal, onCleanup, type JSX } from 'solid-js';

import { cn } from '~/utils';

type ParallaxDirection = 'up' | 'down' | 'left' | 'right';

interface ParallaxScrollProps {
  children: JSX.Element;
  className?: string;
  speed?: number;
  direction?: ParallaxDirection;
  offset?: number;
  disabled?: boolean;
}

export function ParallaxScroll(props: ParallaxScrollProps) {
  const {
    children,
    className = '',
    speed = 0.5,
    direction = 'up',
    offset = 0,
    disabled = false,
  } = props;

  const [scrollY, setScrollY] = createSignal(0);
  const [isInView, setIsInView] = createSignal(false);
  let ref: HTMLDivElement | undefined;
  let observer: IntersectionObserver | undefined;

  const getTransform = () => {
    if (disabled || !isInView()) return 'translate3d(0, 0, 0)';

    const currentScrollY = scrollY();
    const elementTop = ref?.offsetTop || 0;
    const windowHeight = window.innerHeight;
    const elementHeight = ref?.offsetHeight || 0;

    // Calculate viewport bounds to prevent edge vibration
    const viewportTop = currentScrollY;
    const viewportBottom = currentScrollY + windowHeight;
    const elementBottom = elementTop + elementHeight;

    // Only animate when element is in viewport with some margin
    const isInViewport = elementBottom > viewportTop && elementTop < viewportBottom;
    if (!isInViewport) return 'translate3d(0, 0, 0)';

    // Calculate the parallax offset with much more conservative values
    const scrolled = currentScrollY - elementTop + windowHeight;
    const rate = scrolled * speed * 0.2; // Much more conservative speed

    let translateX = 0;
    let translateY = 0;

    // Much stricter bounds checking to prevent vibration
    const maxOffset = 30; // Much smaller maximum offset to prevent eye strain

    switch (direction) {
      case 'up':
        translateY = Math.max(-maxOffset, Math.min(maxOffset, -rate + offset));
        break;
      case 'down':
        translateY = Math.max(-maxOffset, Math.min(maxOffset, rate + offset));
        break;
      case 'left':
        translateX = Math.max(-maxOffset, Math.min(maxOffset, -rate + offset));
        break;
      case 'right':
        translateX = Math.max(-maxOffset, Math.min(maxOffset, rate + offset));
        break;
    }

    return `translate3d(${translateX}px, ${translateY}px, 0)`;
  };

  let rafId: number | undefined;
  let lastScrollY = 0;

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;

      // Only update if scroll position changed significantly to reduce vibration
      if (Math.abs(currentScrollY - lastScrollY) > 1) {
        // Cancel previous animation frame to prevent multiple calls
        if (rafId) {
          cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
          setScrollY(currentScrollY);
          lastScrollY = currentScrollY;
          rafId = undefined;
        });
      }
    }
  };

  createEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    // Set up intersection observer to only animate when in view
    observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (ref) {
      observer.observe(ref);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    onCleanup(() => {
      if (observer) {
        observer.disconnect();
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
    });
  });

  return (
    <div
      ref={ref}
      class={cn('parallax-container', className)}
      style={{
        transform: getTransform(),
        'will-change': 'transform',
        transition: 'transform 0.2s ease-out',
        'backface-visibility': 'hidden',
        perspective: '1000px',
      }}
    >
      {children}
    </div>
  );
}
