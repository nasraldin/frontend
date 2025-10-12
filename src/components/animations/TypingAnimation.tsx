import { createEffect, createSignal } from 'solid-js';

import { cn } from '~/utils';

type TypingSpeed = 'slow' | 'normal' | 'fast' | 'instant';
type CursorStyle = 'block' | 'line' | 'underline' | 'none';

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: TypingSpeed;
  cursor?: CursorStyle;
  delay?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
  onComplete?: () => void;
}

export function TypingAnimation(props: TypingAnimationProps) {
  const {
    text,
    className = '',
    speed = 'normal',
    cursor = 'line',
    delay = 0,
    loop = false,
    pauseOnHover = false,
    onComplete,
  } = props;

  const [displayedText, setDisplayedText] = createSignal('');
  const [isTyping, setIsTyping] = createSignal(false);
  const [isPaused, setIsPaused] = createSignal(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

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

  const typeText = () => {
    if (isPaused()) return;

    const currentText = displayedText();
    if (currentText.length < text.length) {
      setDisplayedText(text.slice(0, currentText.length + 1));
      timeoutId = setTimeout(typeText, getTypingSpeed());
    } else {
      setIsTyping(false);
      onComplete?.();

      if (loop) {
        setTimeout(() => {
          setDisplayedText('');
          setIsTyping(true);
          typeText();
        }, 2000);
      }
    }
  };

  const startTyping = () => {
    if (delay > 0) {
      setTimeout(() => {
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
      }
    }
  };

  const resumeTyping = () => {
    if (pauseOnHover && isTyping()) {
      setIsPaused(false);
      typeText();
    }
  };

  createEffect(() => {
    startTyping();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  });

  return (
    <span
      class={cn('typing-animation', className)}
      onMouseEnter={pauseTyping}
      onMouseLeave={resumeTyping}
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
