import Icons from '~/components/icons';
import AnimatedIcon from '~/components/icons/animated';
import { cn } from '~/utils';

export function renderIcon(name: string, className?: string) {
  const Icon = Icons[`${name}` as keyof typeof Icons];
  return Icon && <Icon class={cn(className)} aria-hidden="true" />;
}

export function renderAnimatedIcon(name: string, className?: string) {
  const Icon = AnimatedIcon[`${name}` as keyof typeof AnimatedIcon];
  return Icon && <Icon class={cn(className)} aria-hidden="true" />;
}
