import { createEffect, createSignal, onCleanup, type JSX } from 'solid-js';

import { cn } from '~/utils';

type ParallaxDirection = 'up' | 'down' | 'left' | 'right';

interface ParallaxScrollProps {
  readonly children: JSX.Element;
  readonly className?: string;
  readonly speed?: number;
  readonly direction?: ParallaxDirection;
  readonly offset?: number;
  readonly disabled?: boolean;
}

export function ParallaxScroll(props: Readonly<ParallaxScrollProps>) {
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

    // Calculate parallax offset based on scroll position relative to element
    const elementCenter = elementTop + elementHeight / 2;
    const viewportCenter = currentScrollY + windowHeight / 2;
    const distanceFromCenter = viewportCenter - elementCenter;

    // Apply speed multiplier - removed the 0.2 reduction to make it more noticeable
    const rate = distanceFromCenter * speed;

    let translateX = 0;
    let translateY = 0;

    // Increased max offset to make direction differences clearly visible
    const maxOffset = 100; // Increased from 30 to make movement more noticeable

    switch (direction) {
      case 'up':
        // Moves up (negative Y) as you scroll down
        translateY = Math.max(-maxOffset, Math.min(maxOffset, -rate + offset));
        break;
      case 'down':
        // Moves down (positive Y) as you scroll down
        translateY = Math.max(-maxOffset, Math.min(maxOffset, rate + offset));
        break;
      case 'left':
        // Moves left (negative X) as you scroll down
        translateX = Math.max(-maxOffset, Math.min(maxOffset, -rate + offset));
        break;
      case 'right':
        // Moves right (positive X) as you scroll down
        translateX = Math.max(-maxOffset, Math.min(maxOffset, rate + offset));
        break;
    }

    return `translate3d(${translateX}px, ${translateY}px, 0)`;
  };

  let rafId: number | undefined;
  let lastScrollY = 0;

  const handleScroll = () => {
    if (globalThis.window !== undefined) {
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
    if (disabled || globalThis.window === undefined) return;

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
        // Removed transition to make parallax movement more immediate and noticeable
        'backface-visibility': 'hidden',
        perspective: '1000px',
      }}
    >
      {children}
    </div>
  );
}
