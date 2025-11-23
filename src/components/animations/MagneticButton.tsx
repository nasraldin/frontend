import { createEffect, createSignal, type JSX } from 'solid-js';

import { cn } from '~/utils';

type MagneticStrength = 'weak' | 'medium' | 'strong';
type MagneticEasing = 'ease' | 'ease-out' | 'spring';

interface MagneticButtonProps {
  readonly children: JSX.Element;
  readonly className?: string;
  readonly strength?: MagneticStrength;
  readonly easing?: MagneticEasing;
  readonly disabled?: boolean;
  readonly onClick?: () => void;
}

export function MagneticButton(props: Readonly<MagneticButtonProps>) {
  const {
    children,
    className = '',
    strength = 'medium',
    easing = 'ease-out',
    disabled = false,
    onClick,
  } = props;

  const [mousePosition, setMousePosition] = createSignal({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = createSignal(false);
  let ref: HTMLDivElement | undefined;

  const getStrength = () => {
    switch (strength) {
      case 'weak':
        return 0.3;
      case 'strong':
        return 0.8;
      default:
        return 0.5;
    }
  };

  const getEasingFunction = () => {
    switch (easing) {
      case 'ease':
        return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      case 'spring':
        return 'cubic-bezier(0.16, 1, 0.3, 1)';
      default:
        return 'cubic-bezier(0.16, 1, 0.3, 1)';
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (disabled || !ref) return;

    const rect = ref.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const strength = getStrength() * 0.6;
    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;

    setMousePosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovering(false);
    setTimeout(() => {
      setMousePosition({ x: 0, y: 0 });
    }, 50);
  };

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  createEffect(() => {
    if (disabled || !ref) return;

    const element = ref;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('click', handleClick);
    };
  });

  return (
    <div
      ref={ref}
      class={cn(
        'magnetic-button cursor-pointer select-none',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      style={{
        transform: isHovering()
          ? `translate3d(${mousePosition().x}px, ${mousePosition().y}px, 0)`
          : 'translate3d(0, 0, 0)',
        transition: `transform 0.6s ${getEasingFunction()}`,
        'will-change': 'transform',
      }}
    >
      {children}
    </div>
  );
}
