import { createSignal, onCleanup } from 'solid-js';

import { IconBaseProps } from '~/components/icons/props';
import { cn } from '~/utils';

const SettingsGearIcon = (props: IconBaseProps) => {
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
          d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
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

export { SettingsGearIcon };
