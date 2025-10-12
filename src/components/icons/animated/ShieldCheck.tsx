import { createSignal, onCleanup } from 'solid-js';

import { IconBaseProps } from '~/components/icons/props';
import { cn } from '~/utils';

const ShieldCheckIcon = (props: IconBaseProps) => {
  const [isAnimating, setIsAnimating] = createSignal(false);
  const [opacity, setOpacity] = createSignal(1);
  const [scale, setScale] = createSignal(1);
  let animationId: number | null = null;

  const startAnimation = () => {
    setIsAnimating(true);
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    const startTime = performance.now();
    const duration = 400; // 400ms duration

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        // Animate opacity from 0 to 1
        const opacityValue = progress;
        setOpacity(opacityValue);

        // Animate scale from 0.5 to 1
        const scaleValue = 0.5 + progress * 0.5;
        setScale(scaleValue);

        animationId = requestAnimationFrame(animate);
      } else {
        setOpacity(1);
        setScale(1);
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
    setOpacity(1);
    setScale(1);
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
          d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
          style={{
            opacity: opacity(),
            transform: `scale(${scale()})`,
            transition: isAnimating()
              ? 'none'
              : 'opacity 0.1s ease-in-out, transform 0.1s ease-in-out',
          }}
        />
      </svg>
    </div>
  );
};

export { ShieldCheckIcon };
