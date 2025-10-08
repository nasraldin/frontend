import { ColorVariant, LayoutName } from '~/constants/enums';

/**
 * @type Direction
 * @description A type representing the possible direction values.
 */
export type Direction = 'ltr' | 'rtl';

/**
 * @type ColorVariantType
 * @description A type representing the possible color variant values.
 * This type is equivalent to the ColorVariant enum.
 */
export type ColorScheme = ColorVariant;

/**
 * @type Theme
 * @description A type representing the possible theme values.
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * @type BorderRadius
 * @description A type representing the possible border radius values.
 */
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * @type FontSize
 * @description A type representing the possible font size values.
 */
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * Represents the different versions of the layout design.
 *
 * This type is used to specify the layout version of the application, allowing for
 * easy tracking of changes and improvements over time. The versions are as follows:
 *
 * - `v1`: The initial design of the layout.
 * - `v2`: A redesigned layout that includes updates to components such as the sidebar,
 *   an updated header, improved responsiveness, and minor UI fixes.
 * - `v3`: A completely redesigned layout that enhances user experience and visual appeal.
 *
 * Usage:
 * You can use the `LayoutVersion` type to enforce type safety when working with layout
 * versions in your application, ensuring that only valid versions are used.
 */
export type LayoutVersion = 'v1' | 'v2' | 'v3';

/**
 * Represents the various layout types available in the application.
 *
 * This type is used to define the different layouts that can be applied to various
 * parts of the application. Each layout type serves a specific purpose and helps
 * in organizing the user interface effectively. The layout types are as follows:
 *
 * - `Home`: A layout designed for home page.
 * - `Public`: A layout optimized for public-facing pages.
 * - `Page`: A layout optimized for content pages.
 * - `Auth`: A layout specifically for authentication-related pages.
 * - `Dashboard`: A layout tailored for dashboard views.
 * - `General`: A general layout used for various purposes.
 * - `Settings`: A layout focused on settings and preferences.
 *
 * Usage:
 * You can use the LayoutType to enforce type safety when specifying layout
 * types in your application, ensuring that only valid types are utilized.
 */
export type LayoutType = LayoutName;

/**
 * Represents the preferences for the layout.
 *
 * This type is used to specify the preferences for the layout, allowing for
 * easy tracking of changes and improvements over time. The preferences are as follows:
 */
export type LayoutPreferences = Partial<
  Record<LayoutType, { name: string; version: string }>
>;
