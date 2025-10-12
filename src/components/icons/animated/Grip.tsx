import { createEffect, createSignal, For, onCleanup } from 'solid-js';

import { IconBaseProps } from '~/components/icons/props';
import { cn } from '~/utils';

const circles = [
  { cx: 19, cy: 5 }, // Top right
  { cx: 12, cy: 5 }, // Top middle
  { cx: 19, cy: 12 }, // Middle right
  { cx: 5, cy: 5 }, // Top left
  { cx: 12, cy: 12 }, // Center
  { cx: 19, cy: 19 }, // Bottom right
  { cx: 5, cy: 12 }, // Middle left
  { cx: 12, cy: 19 }, // Bottom middle
  { cx: 5, cy: 19 }, // Bottom left
];

const GripIcon = (props: IconBaseProps) => {
  const [isHovered, setIsHovered] = createSignal(false);
  const [circleOpacities, setCircleOpacities] = createSignal(circles.map(() => 1));

  let animationId: number | null = null;

  const animateCircles = () => {
    if (!isHovered()) return;

    const startTime = performance.now();
    const duration = 200; // 200ms per phase
    const totalDuration = duration * 2; // Two phases

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);

      if (progress < 0.5) {
        // First phase: fade out
        const phaseProgress = progress * 2;
        setCircleOpacities((prev) => prev.map((_) => 1 - phaseProgress * 0.7));
      } else {
        // Second phase: fade in
        const phaseProgress = (progress - 0.5) * 2;
        setCircleOpacities((prev) => prev.map((_) => 0.3 + phaseProgress * 0.7));
      }

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
  };

  createEffect(() => {
    if (isHovered()) {
      animateCircles();
    } else {
      setCircleOpacities(circles.map(() => 1));
    }
  });

  onCleanup(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });

  return (
    <div
      class="flex cursor-pointer items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <For each={circles}>
          {(circle, index) => (
            <circle
              cx={circle.cx}
              cy={circle.cy}
              r="1"
              style={{
                opacity: circleOpacities()[index()],
                transition: 'opacity 0.1s ease-in-out',
              }}
            />
          )}
        </For>
      </svg>
    </div>
  );
};

export { GripIcon };
