import { createSignal, onCleanup } from 'solid-js';

import { IconBaseProps } from '~/components/icons/props';
import { cn } from '~/utils';

const BellIcon = (props: IconBaseProps) => {
  const [isAnimating, setIsAnimating] = createSignal(false);
  const [rotation, setRotation] = createSignal(0);
  let animationId: number | null = null;

  const startAnimation = () => {
    setIsAnimating(true);
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    const startTime = performance.now();
    const duration = 500; // 500ms duration
    const keyframes = [0, -10, 10, -10, 0]; // Rotation keyframes

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        // Calculate which keyframe we're between
        const keyframeProgress = progress * (keyframes.length - 1);
        const keyframeIndex = Math.floor(keyframeProgress);
        const nextKeyframeIndex = Math.min(keyframeIndex + 1, keyframes.length - 1);
        const localProgress = keyframeProgress - keyframeIndex;

        // Interpolate between keyframes
        const currentRotation = keyframes[keyframeIndex];
        const nextRotation = keyframes[nextKeyframeIndex];
        const interpolatedRotation =
          currentRotation + (nextRotation - currentRotation) * localProgress;

        setRotation(interpolatedRotation);
        animationId = requestAnimationFrame(animate);
      } else {
        setRotation(0);
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
    setRotation(0);
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
        style={{
          transform: `rotate(${rotation()}deg)`,
          transition: isAnimating() ? 'none' : 'transform 0.1s ease-in-out',
        }}
        {...props}
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    </div>
  );
};

export { BellIcon };
