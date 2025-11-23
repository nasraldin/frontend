import { SolidNode } from '~/types';

import { ar } from './ar';
import { en } from './en';

// Create a type for the combined keys object
export type DefaultDictionary = typeof en & typeof ar;

export interface JSONDictionary {
  ar: typeof ar;
  en: typeof en;
}

// Create a type for the combined ar, en object
export type Dictionary = Record<AppLocale, DefaultDictionary> | JSONDictionary;

/**
 * Load dictionary.
 * @returns locales json
 */
export const JsonDictionary: Dictionary = {
  ar: ar,
  en: en,
};
// Create a type for the key params
export type TranslationParams = Record<string, string | number | SolidNode>;
