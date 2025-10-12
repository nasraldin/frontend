import { createSignal, onCleanup } from 'solid-js';

import { IconBaseProps } from '~/components/icons/props';
import { cn } from '~/utils';

const ActivityIcon = (props: IconBaseProps) => {
  const [isAnimating, setIsAnimating] = createSignal(false);
  let animationId: number | null = null;

  const startAnimation = () => {
    setIsAnimating(true);
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    // Simple animation using requestAnimationFrame
    const startTime = performance.now();
    const duration = 600; // 600ms duration

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationId = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  };

  onCleanup(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });

  return (
    <div
      class="flex cursor-pointer items-center justify-center select-none"
      onMouseEnter={startAnimation}
      onMouseLeave={stopAnimation}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={cn(props.class)}
        {...props}
      >
        <path
          d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
          style={{
            opacity: isAnimating() ? '0' : '1',
            transition: 'opacity 0.1s ease-in-out',
          }}
        />
      </svg>
    </div>
  );
};

export { ActivityIcon };
