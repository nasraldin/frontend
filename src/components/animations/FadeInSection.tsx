import { createEffect, createMemo, createSignal, type JSX } from 'solid-js';

import { cn } from '~/utils';

type Direction = 'up' | 'down' | 'left' | 'right';

interface FadeInSectionProps {
  readonly children: JSX.Element;
  readonly className?: string;
  readonly delay?: number;
  readonly direction?: Direction;
  readonly duration?: number;
  readonly threshold?: number;
  readonly once?: boolean;
}

export function FadeInSection(props: Readonly<FadeInSectionProps>) {
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

  const animationValues = createMemo(() => {
    const distance = 50; // Increased from 20 to make movement more noticeable
    let y = 0;
    if (direction === 'up') {
      y = distance; // Starts below, moves up
    } else if (direction === 'down') {
      y = -distance; // Starts above, moves down
    }

    let x = 0;
    if (direction === 'left') {
      x = distance; // Starts to the right, moves left
    } else if (direction === 'right') {
      x = -distance; // Starts to the left, moves right
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

  const getTransitionStyle = () => {
    const values = animationValues();
    const currentValues = isInView() ? values.visible : values.hidden;
    const isVisible = isInView();

    return {
      opacity: currentValues.opacity,
      transform: `translate3d(${currentValues.x}px, ${currentValues.y}px, 0)`,
      // Only apply transition when becoming visible to avoid initial flash
      transition: isVisible
        ? `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
        : 'none',
      'will-change': isVisible ? 'transform, opacity' : 'auto',
    };
  };

  return (
    <div ref={ref} class={cn(className)} style={getTransitionStyle()}>
      {children}
    </div>
  );
}
