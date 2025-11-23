import { createEffect, createSignal, type JSX } from 'solid-js';

import { cn } from '~/utils';

type SlideDirection = 'up' | 'down' | 'left' | 'right';
type SlideEasing = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';

interface SlideInProps {
  children: JSX.Element;
  className?: string;
  direction?: SlideDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  easing?: SlideEasing;
  threshold?: number;
  once?: boolean;
  trigger?: 'scroll' | 'hover' | 'click';
}

export function SlideIn(props: Readonly<SlideInProps>) {
  const {
    children,
    className = '',
    direction = 'up',
    distance = 50,
    duration = 0.6,
    delay = 0,
    easing = 'spring',
    threshold = 0.1,
    once = true,
    trigger = 'scroll',
  } = props;

  const [isActive, setIsActive] = createSignal(false);
  let ref: HTMLDivElement | undefined;

  const getEasingFunction = () => {
    switch (easing) {
      case 'spring':
        return 'cubic-bezier(0.16, 1, 0.3, 1)';
      case 'ease':
        return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      case 'ease-in':
        return 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
      case 'ease-out':
        return 'cubic-bezier(0.16, 1, 0.3, 1)';
      case 'ease-in-out':
        return 'cubic-bezier(0.645, 0.045, 0.355, 1)';
      default:
        return 'cubic-bezier(0.16, 1, 0.3, 1)';
    }
  };

  const getTransform = () => {
    if (!isActive()) {
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`;
        case 'down':
          return `translateY(-${distance}px)`;
        case 'left':
          return `translateX(${distance}px)`;
        case 'right':
          return `translateX(-${distance}px)`;
        default:
          return `translateY(${distance}px)`;
      }
    }
    return 'translate(0, 0)';
  };

  const handleInteraction = () => {
    if (trigger === 'hover' || trigger === 'click') {
      setIsActive(true);
      if (trigger === 'click' && once) {
        // Keep active after click
      }
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      // Add a small delay to prevent flickering
      setTimeout(() => setIsActive(false), 150);
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent & { currentTarget: HTMLDivElement; target: Element },
  ) => {
    if (trigger === 'click' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleInteraction();
    }
  };

  createEffect(() => {
    if (trigger !== 'scroll') return;

    const element = ref;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsActive(false);
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  });

  return (
    <div
      ref={ref}
      class={cn('transform-gpu transition-all will-change-transform', className)}
      style={{
        opacity: isActive() ? 1 : 0,
        transform: getTransform(),
        transition: `all ${duration}s ${getEasingFunction()} ${delay}s`,
        'will-change': 'transform, opacity',
      }}
      role={trigger === 'click' ? 'button' : undefined}
      tabIndex={trigger === 'click' ? 0 : undefined}
      onMouseEnter={trigger === 'hover' ? handleInteraction : undefined}
      onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
      onClick={trigger === 'click' ? handleInteraction : undefined}
      onKeyDown={trigger === 'click' ? handleKeyDown : undefined}
    >
      {children}
    </div>
  );
}
