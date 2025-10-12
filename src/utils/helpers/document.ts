import { AppRegex, DirectionType, SideDirectionType } from '~/constants';
import { Direction } from '~/types';

// import { getFontclass } from '~/utils/fonts';
// import { getDir } from '~/utils/i18n';

// /**
//  * Utility function to update HTML document attributes
//  * @param locale
//  * @returns
//  */
// export const updateDocumentAttributes = (locale: string): void => {
//   if (isSSR) return;

//   const html = document.documentElement;
//   const dir = getDir(locale);
//   const fontclass = getFontclass(locale);

//   // Update language and direction
//   html.setAttribute('lang', locale);
//   html.setAttribute('dir', dir);

//   // Update font classes
//   document.body.classList.add(fontclass);
// };

/**
 * Checks if a given locale represents an Arabic language or script.
 *
 * @param {string} locale - The locale or language code to check.
 * @returns {boolean} - True if the locale is Arabic, false otherwise.
 */
export const isArabic = (locale: string): boolean => {
  return Boolean(locale?.trim().match(AppRegex.Arabic));
};

/**
 * Determines the text direction (LTR or RTL) based on the provided Direction flag.
 *
 * @param {boolean} isRtl
 * - A flag indicating whether the text should be in right-to-left (RTL) direction.
 * @returns {Direction}
 * - The text direction: 'ltr' (left-to-right) or 'rtl' (right-to-left).
 */
export const checkDir = (isRtl: boolean): Direction => {
  return isRtl ? DirectionType.RTL : DirectionType.LTR;
};

/**
 * Determines the text direction (LTR or RTL) based on the provided locale or language code.
 *
 * @param {string} locale - The locale or language code to check for RTL support.
 * @returns {Direction} - The text direction: 'ltr' (left-to-right) or 'rtl' (right-to-left).
 */
export const getDir = (locale: string): Direction => {
  return checkDir(Boolean(locale?.trim().match(AppRegex.Arabic)));
};

/**
 * Determines the text direction (Left or Right) based on the provided locale or language code.
 *
 * @param {string} locale - The locale or language code to check for Left or Right support.
 * @returns {SideDirectionType} - The text direction: 'left' (left) or 'right' (right).
 */
export const getSideDir = (locale: string): SideDirectionType => {
  return isArabic(locale) ? SideDirectionType.Right : SideDirectionType.Left;
};

/**
 * Determines the menu position direction (Left or Right) based on the provided locale or language code.
 *
 * @param {string} locale - The locale or language code to check for Left or Right support.
 * @returns {SideDirectionType} - The menu position direction: 'left' (left) or 'right' (right).
 */
export const getSideMenuPosition = (locale: string): SideDirectionType => {
  return isArabic(locale) ? SideDirectionType.Left : SideDirectionType.Right;
};
