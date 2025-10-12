/**
 * @enum {string}
 * @description Enum representing the available direction types.
 *
 * LTR: Left to Right
 *
 * RTL: Right to Left.
 */
export enum DirectionType {
  LTR = 'ltr',
  RTL = 'rtl',
}

/**
 * @enum {string}
 * @description Enum representing the available side direction types.
 */
export enum SideDirectionType {
  Left = 'left',
  Right = 'right',
}

/**
 * @enum {string}
 * @description Enum representing the available layout names.
 */
export enum LayoutName {
  Default = 'Default',
  Home = 'Home',
  Page = 'Page',
  Blog = 'Blog',
  Auth = 'Auth',
  Dashboard = 'Dashboard',
}

/**
 * @enum {string}
 * @description Enum representing the available color variants.
 */
export enum ColorVariant {
  Default = 'default',
  Zinc = 'zinc',
  Slate = 'slate',
  Stone = 'stone',
  Gray = 'gray',
  Neutral = 'neutral',
  Red = 'red',
  Rose = 'rose',
  Orange = 'orange',
  Green = 'green',
  Blue = 'blue',
  Yellow = 'yellow',
  Violet = 'violet',
  Purple = 'purple',
}

/**
 * @enum {string}
 * @description Enum representing the available theme modes.
 */
export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

/**
 * @enum {number}
 * @description Enum representing the available font sizes.
 */
export enum FontSize {
  Smallest = 'xs',
  Smaller = 'sm',
  Base = 'base',
  Large = 'lg',
  Larger = 'xl',
}

/**
 * @enum {number}
 * @description Enum representing the available border radii.
 */
export enum RadiusSize {
  None = 'none',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  Larger = 'xl',
}
