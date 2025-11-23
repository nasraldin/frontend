import { createEffect, createSignal, type JSX } from 'solid-js';

import { cn } from '~/utils';

type OfferAnimation =
  | 'pulse'
  | 'glow'
  | 'wiggle'
  | 'float'
  | 'shimmer'
  | 'bounce-glow'
  | 'wave'
  | 'rainbow'
  | 'flow'
  | 'ocean'
  | 'aurora';
type OfferSize = 'small' | 'medium' | 'large';

interface ShowOffersProps {
  readonly children: JSX.Element;
  readonly className?: string;
  readonly animation?: OfferAnimation;
  readonly size?: OfferSize;
  readonly duration?: number;
  readonly delay?: number;
  readonly intensity?: 'low' | 'medium' | 'high';
  readonly trigger?: 'scroll' | 'hover' | 'always';
  readonly threshold?: number;
  readonly once?: boolean;
}

export function ShowOffers(props: Readonly<ShowOffersProps>) {
  const {
    children,
    className = '',
    animation = 'pulse',
    size = 'medium',
    duration = 2,
    delay = 0,
    intensity = 'medium',
    trigger = 'scroll',
    threshold = 0.1,
    once = true,
  } = props;

  const [isActive, setIsActive] = createSignal(false);
  let ref: HTMLDivElement | undefined;

  const getIntensityMultiplier = () => {
    switch (intensity) {
      case 'low':
        return 0.5;
      case 'high':
        return 1.5;
      default:
        return 1;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const getAnimationStyles = () => {
    const multiplier = getIntensityMultiplier();

    switch (animation) {
      case 'glow':
        return {
          animation: `offer-glow ${duration}s ease-in-out infinite`,
          'animation-delay': `${delay}s`,
          'box-shadow': `0 0 ${20 * multiplier}px rgba(255, 215, 0, 0.6)`,
        };
      case 'wiggle':
        return {
          animation: `offer-wiggle ${duration}s ease-in-out infinite`,
          'animation-delay': `${delay}s`,
        };
      case 'float':
        return {
          animation: `offer-float ${duration}s ease-in-out infinite`,
          'animation-delay': `${delay}s`,
        };
      case 'shimmer':
        return {
          animation: `offer-shimmer ${duration}s ease-in-out infinite`,
          'animation-delay': `${delay}s`,
          background:
            'linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
          'background-size': '400% 400%',
        };
      case 'wave':
        return {
          animation: `offer-wave ${duration}s ease-in-out infinite`,
          'animation-delay': `${delay}s`,
          background:
            'linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b)',
          'background-size': '400% 100%',
        };
      case 'rainbow':
        return {
          animation: `offer-rainbow ${duration}s ease-in-out infinite`,
          'animation-delay': `${delay}s`,
          background:
            'linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)',
          'background-size': '400% 400%',
        };
      case 'flow':
        return {
          animation: `offer-flow ${duration}s ease-in-out infinite`,
          'animation-delay': `${delay}s`,
          background:
            'linear-gradient(0deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b)',
          'background-size': '100% 400%',
        };
      case 'ocean':
        return {
          animation: `offer-ocean ${duration}s ease-in-out infinite`,
          'animation-delay': `${delay}s`,
          background:
            'linear-gradient(45deg, #00c9ff, #92fe9d, #00c9ff, #92fe9d, #00c9ff)',
          'background-size': '400% 400%',
        };
      case 'aurora':
        return {
          animation: `offer-aurora ${duration}s ease-in-out infinite`,
          'animation-delay': `${delay}s`,
          background:
            'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea)',
          'background-size': '400% 400%',
        };
      case 'bounce-glow':
        return {
          animation: `offer-bounce-glow ${duration}s ease-in-out infinite`,
          'animation-delay': `${delay}s`,
          'box-shadow': `0 0 ${30 * multiplier}px rgba(255, 105, 180, 0.8)`,
        };
      case 'pulse':
      default:
        return {
          animation: `offer-pulse ${duration}s ease-in-out infinite`,
          'animation-delay': `${delay}s`,
        };
    }
  };

  const handleInteraction = () => {
    if (trigger === 'hover' || trigger === 'always') {
      setIsActive(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setTimeout(() => setIsActive(false), 150);
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
        rootMargin: '0px 0px -50px 0px',
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  });

  const shouldAnimate = () => {
    if (trigger === 'always') return true;
    if (trigger === 'hover') return isActive();
    return isActive();
  };

  return (
    <div
      ref={ref}
      class={cn(
        'offer-animation transform-gpu transition-all will-change-transform',
        getSizeClasses(),
        className,
      )}
      style={shouldAnimate() ? getAnimationStyles() : {}}
      onMouseEnter={trigger === 'hover' ? handleInteraction : undefined}
      onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
    >
      {children}
    </div>
  );
}
