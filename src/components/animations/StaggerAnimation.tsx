import { createEffect, createSignal, type JSX } from 'solid-js';

import { cn } from '~/utils';

type StaggerDirection = 'up' | 'down' | 'left' | 'right' | 'center';
type StaggerType = 'fade' | 'slide' | 'scale' | 'rotate';

interface StaggerAnimationProps {
  children: JSX.Element;
  className?: string;
  direction?: StaggerDirection;
  type?: StaggerType;
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export function StaggerAnimation(props: Readonly<StaggerAnimationProps>) {
  const {
    children,
    className = '',
    direction = 'up',
    staggerDelay = 0.1,
    duration = 0.5,
    delay = 0,
    threshold = 0.1,
    once = true,
  } = props;

  const [isActive, setIsActive] = createSignal(false);
  let ref: HTMLDivElement | undefined;

  const getChildTransform = () => {
    if (!isActive()) {
      const distance = 30;
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`;
        case 'down':
          return `translateY(-${distance}px)`;
        case 'left':
          return `translateX(${distance}px)`;
        case 'right':
          return `translateX(-${distance}px)`;
        case 'center':
          return `scale(0.8)`;
        default:
          return `translateY(${distance}px)`;
      }
    }
    return 'translate(0, 0) scale(1)';
  };

  const getChildStyle = (index: number) => {
    const baseDelay = delay + index * staggerDelay;

    return {
      opacity: isActive() ? 1 : 0,
      transform: getChildTransform(),
      transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${baseDelay}s`,
      'will-change': 'transform, opacity',
    };
  };

  createEffect(() => {
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
    <div ref={ref} class={cn('stagger-container', className)}>
      <div class="stagger-children space-y-4">
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <div class="stagger-child" style={getChildStyle(index)}>
              {child}
            </div>
          ))
        ) : (
          <div class="stagger-child" style={getChildStyle(0)}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
