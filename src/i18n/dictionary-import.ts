import { ar } from './dictionary/ar';
import { en } from './dictionary/en';

/**
 * Utility function to get dictionary messages for a locale
 * @param locale - The locale code (e.g., 'en', 'ar', 'ar-AE', 'en-US')
 * @returns The dictionary messages
 */
export function getDictionaryMessages(locale: string) {
  // Handle locale variants by extracting the base locale
  const baseLocale = locale.split('-')[0];

  switch (baseLocale) {
    case 'en':
      return en;
    case 'ar':
      return ar;
    default:
      return en; // fallback to English
  }
}
