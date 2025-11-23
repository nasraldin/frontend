import { createEffect, createSignal, type JSX } from 'solid-js';

import { cn } from '~/utils';

type ScaleType = 'grow' | 'shrink' | 'bounce' | 'elastic';
type ScaleOrigin =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

interface ScaleInProps {
  children: JSX.Element;
  className?: string;
  scale?: number;
  type?: ScaleType;
  origin?: ScaleOrigin;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  trigger?: 'scroll' | 'hover' | 'click';
}

export function ScaleIn(props: Readonly<ScaleInProps>) {
  const {
    children,
    className = '',
    scale = 0.8,
    type = 'grow',
    origin = 'center',
    duration = 0.5,
    delay = 0,
    threshold = 0.1,
    once = true,
    trigger = 'scroll',
  } = props;

  const [isActive, setIsActive] = createSignal(false);
  let ref: HTMLDivElement | undefined;

  const getScaleValue = () => {
    switch (type) {
      case 'bounce':
        return 0.3; // Start smaller for more dramatic bounce
      case 'elastic':
        return 0.2; // Start very small for elastic effect
      case 'grow':
        return 0.5; // Start at half size for smooth grow
      case 'shrink':
        return 1.2; // Start larger for shrink effect
      default:
        return scale;
    }
  };

  const getEasingFunction = () => {
    switch (type) {
      case 'bounce':
        return 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      case 'elastic':
        return 'cubic-bezier(0.16, 1, 0.3, 1)';
      case 'grow':
        return 'cubic-bezier(0.16, 1, 0.3, 1)';
      case 'shrink':
        return 'cubic-bezier(0.7, 0, 0.84, 0)';
      default:
        return 'cubic-bezier(0.16, 1, 0.3, 1)';
    }
  };

  const getTransformOrigin = () => {
    switch (origin) {
      case 'top':
        return 'top center';
      case 'bottom':
        return 'bottom center';
      case 'left':
        return 'left center';
      case 'right':
        return 'right center';
      case 'top-left':
        return 'top left';
      case 'top-right':
        return 'top right';
      case 'bottom-left':
        return 'bottom left';
      case 'bottom-right':
        return 'bottom right';
      default:
        return 'center center';
    }
  };

  const handleInteraction = () => {
    if (trigger === 'hover' || trigger === 'click') {
      setIsActive(true);
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
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger when element is 50px into viewport
      },
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
        transform: isActive()
          ? 'scale3d(1, 1, 1)'
          : `scale3d(${getScaleValue()}, ${getScaleValue()}, 1)`,
        'transform-origin': getTransformOrigin(),
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
