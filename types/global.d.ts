import { LOCALES } from '~/i18n/locales';

declare global {
  /**
   * Represents a supported application locales.
   *
   * @example
   * const locale: AppLocale = 'en';
   */
  type AppLocale = (typeof LOCALES)[number];

  interface Request {
    id: string;
    logUuid: string;
  }
}

export {};
