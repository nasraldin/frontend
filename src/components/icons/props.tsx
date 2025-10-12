import type { JSX } from 'solid-js';

export interface IconBaseProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  children?: JSX.Element;
  size?: string | number;
  color?: string;
  title?: string;
}
