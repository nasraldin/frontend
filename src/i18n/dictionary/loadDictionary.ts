import { DEFAULT_LOCALE } from '~/i18n/config';
import { SolidNode } from '~/types';

import {
  DefaultDictionary,
  Dictionary,
  JsonDictionary,
  TranslationKey,
  TranslationParams,
} from './types';

const translationCache: Record<string, string | SolidNode[]> = {};

// Attempt to look up the translation for the provided key in the dictionary
const getNestedValue = (
  obj: DefaultDictionary,
  path: string[],
): string | object | undefined => {
  return path.reduce<string | object | undefined>((prev, curr) => {
    if (prev && typeof prev === 'object' && curr in prev) {
      return prev[curr as keyof typeof prev];
    }
    return undefined;
  }, obj);
};

/**
 * Loads a dictionary for a specific locale and returns a translation function.
 *
 * This function creates a closure around the specified locale's dictionary and
 * returns a function that can be used to retrieve translations.
 *
 * @param {AppLocale} locale - The locale for which to load the dictionary.
 * @param {Dictionary} dictionaryObj - The dictionary object containing translations for all locales.
 * @returns {(key: TranslationKey, params?: TranslationParams)} A function that retrieves translations.
 *
 * @remarks
 * - The returned function uses caching to optimize performance for repeated translations.
 * - It supports nested keys using dot notation (e.g., 'parent.child.grandchild').
 * - If a translation is an object, it will be JSON stringified.
 * - If a translation is not found, the original key is returned.
 * - The function supports parameter substitution in translations.
 *
 * @example
 * ```typescript
 * const translate = loadDictionary('en');
 * console.log(translate('greeting')); // Output: "Hello"
 * ```
 *
 * @see AppLocale - The type definition for valid locales.
 * @see Dictionary - The type definition for the dictionary object.
 * @see TranslationKey - The type for translation keys.
 * @see TranslationParams - The type for translation parameters.
 * @see DEFAULT_LOCALE - The default locale used if none is specified.
 * @see JsonDictionary - The default dictionary object.
 */
export const loadDictionary = (
  locale: AppLocale = DEFAULT_LOCALE,
  dictionaryObj: Dictionary = JsonDictionary,
): ((key: TranslationKey, params?: TranslationParams) => string | SolidNode[]) => {
  // Retrieve the dictionary for the specified locale
  const dictionary = dictionaryObj[locale] as DefaultDictionary;

  // Define a translation function that accepts a key and optional parameters for string formatting
  return (
    key: TranslationKey,
    params?: TranslationParams,
  ): string | SolidNode[] => {
    // Optimize performance by caching keys
    // Create cache key without stringifying the entire params object
    const cacheKey = `${locale}:${key}:${params ? Object.keys(params).join(',') : ''}`;

    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    let translation = getNestedValue(dictionary, key.split('.'));

    if (typeof translation === 'object') {
      // If the translation is an object, stringify it
      translation = JSON.stringify(translation);
    } else if (typeof translation !== 'string') {
      // If the translation is neither a string nor an object, return the key
      return key;
    }

    // At this point, translation is guaranteed to be a string
    if (params && Object.entries(params).length) {
      const parts = translation.split(/(\{[^}]+\})/g);
      const result = parts.map((part) => {
        const match = part.match(/^\{([^}]+)\}$/);
        if (match) {
          const paramKey = match[1];
          const paramValue = params[paramKey];
          return paramValue !== undefined ? paramValue : part;
        }
        return part;
      });

      // Cache the result with params
      translationCache[cacheKey] = result;
      return result;
    }
    // Return cached formatted translation
    translationCache[cacheKey] = translation;

    return translation;
  };
};
