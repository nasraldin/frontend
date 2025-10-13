/*-----------------------------------------------*
 *                                               *
 *             App Global Constants              *
 *                                               *
 ------------------------------------------------*/

export const BLOWFISH_SECRET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const FIFTYONE_DEGREES_KEY = 'AQRTbhESnYwjjhXp3Eg';

export const MINIMAL_SCROLL_VALUE = 200;
export const SEARCH_LETTER_LENGTH = 4;

export const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#1E2226', // #09090b
};

export const LOG_LEVEL = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  FATAL: 'fatal',
  TRACE: 'trace',
} as const;
