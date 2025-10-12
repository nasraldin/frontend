import Icons from '~/components/icons';
import { cn } from '~/utils';

export function renderIcon(name: string, className?: string) {
  const Icon = Icons[`${name}` as keyof typeof Icons];
  return Icon && <Icon class={cn(className)} aria-hidden="true" />;
}
