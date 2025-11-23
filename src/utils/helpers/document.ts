import { AppRegex, DirectionType, SideDirectionType } from '~/constants';
import { Direction } from '~/types';

/**
 * Checks if a given locale represents an Arabic language or script.
 *
 * @param {string} locale - The locale or language code to check.
 * @returns {boolean} - True if the locale is Arabic, false otherwise.
 */
export const isArabic = (locale: string): boolean => {
  return Boolean(AppRegex.Arabic.exec(locale?.trim()));
};

/**
 * Determines the text direction (LTR or RTL) based on the provided locale or language code.
 *
 * @param {string} locale - The locale or language code to check for RTL support.
 * @returns {Direction} - The text direction: 'ltr' (left-to-right) or 'rtl' (right-to-left).
 */
export const getDir = (locale: string): Direction => {
  return isArabic(locale) ? DirectionType.RTL : DirectionType.LTR;
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
