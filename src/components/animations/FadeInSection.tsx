import { createEffect, createMemo, createSignal, type JSX } from 'solid-js';

import { cn } from '~/utils';

type Direction = 'up' | 'down' | 'left' | 'right';

interface FadeInSectionProps {
  children: JSX.Element;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export function FadeInSection(props: FadeInSectionProps) {
  const {
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 0.5,
    threshold = 0.1,
    once = true,
  } = props;

  const [isInView, setIsInView] = createSignal(false);
  let ref: HTMLDivElement | undefined;

  // Memoize animation values so they're stable across renders
  const animationValues = createMemo(() => {
    const distance = 20; // pixels to move

    // Extract nested ternary into explicit statements to satisfy Sonar rule
    let y = 0;
    if (direction === 'up') {
      y = distance;
    } else if (direction === 'down') {
      y = -distance;
    }

    let x = 0;
    if (direction === 'left') {
      x = distance;
    } else if (direction === 'right') {
      x = -distance;
    }

    return {
      hidden: {
        opacity: 0,
        y,
        x,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
      },
    };
  });

  createEffect(() => {
    const element = ref;
    if (!element || isInView()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  });

  // Create CSS transition styles with smoother easing
  const getTransitionStyle = () => {
    const values = animationValues();
    const currentValues = isInView() ? values.visible : values.hidden;

    return {
      opacity: currentValues.opacity,
      transform: `translate3d(${currentValues.x}px, ${currentValues.y}px, 0)`,
      transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      'will-change': 'transform, opacity',
    };
  };

  return (
    <div ref={ref} class={cn(className)} style={getTransitionStyle()}>
      {children}
    </div>
  );
}
