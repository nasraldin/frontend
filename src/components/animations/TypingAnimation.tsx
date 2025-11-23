import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';

import { cn } from '~/utils';

type TypingSpeed = 'slow' | 'normal' | 'fast' | 'instant';
type CursorStyle = 'block' | 'line' | 'underline' | 'none';

interface TypingAnimationProps {
  readonly text: string;
  readonly className?: string;
  readonly speed?: TypingSpeed;
  readonly cursor?: CursorStyle;
  readonly delay?: number;
  readonly loop?: boolean;
  readonly pauseOnHover?: boolean;
  readonly onComplete?: () => void;
}

export function TypingAnimation(props: TypingAnimationProps) {
  const {
    text,
    className = '',
    speed = 'normal',
    cursor = 'line',
    delay = 0,
    pauseOnHover = false,
    onComplete,
  } = props;

  const [displayedText, setDisplayedText] = createSignal('');
  const [isTyping, setIsTyping] = createSignal(false);
  const [isPaused, setIsPaused] = createSignal(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let delayTimeoutId: ReturnType<typeof setTimeout> | undefined;
  let loopTimeoutId: ReturnType<typeof setTimeout> | undefined;
  let isLooping = false;

  const getTypingSpeed = () => {
    switch (speed) {
      case 'slow':
        return 100;
      case 'fast':
        return 50;
      case 'instant':
        return 0;
      default:
        return 80;
    }
  };

  const getCursorStyle = () => {
    switch (cursor) {
      case 'block':
        return '|';
      case 'line':
        return '|';
      case 'underline':
        return '_';
      case 'none':
        return '';
      default:
        return '|';
    }
  };

  const clearAllTimeouts = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
    if (delayTimeoutId) {
      clearTimeout(delayTimeoutId);
      delayTimeoutId = undefined;
    }
    if (loopTimeoutId) {
      clearTimeout(loopTimeoutId);
      loopTimeoutId = undefined;
    }
  };

  const restartLoop = () => {
    setDisplayedText('');
    setIsPaused(false);
    setIsTyping(true);
    typeText();
  };

  const typeText = () => {
    if (isPaused()) return;

    const currentText = displayedText();
    const currentTextProp = text;
    if (currentText.length < currentTextProp.length) {
      setDisplayedText(currentTextProp.slice(0, currentText.length + 1));
      timeoutId = setTimeout(typeText, getTypingSpeed());
    } else {
      // Typing is complete
      setIsTyping(false);
      onComplete?.();

      // Check if we should loop - access props.loop directly for reactivity
      const shouldLoop = props.loop;
      if (shouldLoop) {
        isLooping = true;
        // Clear any existing loop timeout before setting a new one
        if (loopTimeoutId) {
          clearTimeout(loopTimeoutId);
          loopTimeoutId = undefined;
        }
        // Set timeout to restart the animation
        loopTimeoutId = setTimeout(() => {
          restartLoop();
        }, 2000);
      } else {
        isLooping = false;
      }
    }
  };

  const startTyping = () => {
    // Don't restart if we're in the middle of a loop
    if (isLooping) {
      return;
    }

    clearAllTimeouts();
    setDisplayedText('');
    setIsTyping(false);
    setIsPaused(false);
    isLooping = false;

    if (delay > 0) {
      delayTimeoutId = setTimeout(() => {
        setIsTyping(true);
        typeText();
      }, delay);
    } else {
      setIsTyping(true);
      typeText();
    }
  };

  const pauseTyping = () => {
    if (pauseOnHover) {
      setIsPaused(true);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    }
  };

  const resumeTyping = () => {
    if (pauseOnHover && isTyping()) {
      setIsPaused(false);
      typeText();
    }
  };

  // Track text changes and restart animation
  let previousText = text;

  onMount(() => {
    startTyping();
  });

  createEffect(() => {
    const currentText = text;
    // Only restart if text actually changed and we're not looping
    if (currentText !== previousText && !isLooping) {
      previousText = currentText;
      startTyping();
    }
  });

  // Cleanup on unmount
  onCleanup(() => {
    clearAllTimeouts();
  });

  return (
    <span
      class={cn('typing-animation', className)}
      {...(pauseOnHover
        ? {
            onMouseEnter: pauseTyping,
            onMouseLeave: resumeTyping,
          }
        : {})}
    >
      {displayedText()}
      {isTyping() && (
        <span
          class="typing-cursor"
          style={{
            animation: 'typing-blink 1s infinite',
            display: 'inline-block',
            'margin-left': '2px',
          }}
        >
          {getCursorStyle()}
        </span>
      )}
    </span>
  );
}
