import { CookieSameSite } from '~/constants';
import { env, isProd } from '~/env';

export const DEFAULT_LOCALE = 'en' as const;
export const LOCALE_COOKIE_NAME = 'locale';
export const LOCALE_COOKIE_TTL = 365 * 24 * 60 * 60;

export const DEFAULT_COOKIE_OPTIONS = {
  maxAge: LOCALE_COOKIE_TTL,
  path: '/',
  domain: isProd ? `.${env.APP_DOMAIN}` : env.APP_DOMAIN,
  secure: isProd,
  sameSite: CookieSameSite.Lax,
  httpOnly: false,
};
