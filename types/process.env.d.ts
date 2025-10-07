/*-----------------------------------------------*
 *                                               *
 *               ProcessEnv                      *
 *                                               *
 ------------------------------------------------*/

// Declare known environment variables.
// Enables auto-completion when using "process.env.".
// Makes it easier to find env vars, and helps avoid typo mistakes.
// Unlisted env vars will still be usable.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // App environment
      readonly NODE_ENV: 'development' | 'production' | 'test' | 'staging' | 'uat';
      readonly HOST: string;
      readonly PORT: number;
      readonly VITE_APP_URL: string;
      readonly VITE_API_URL: string;
      readonly VITE_APP_DOMAIN: string;
      // Auth environment
      readonly AUTH_URL: string;
      readonly AUTH_SECRET: string;
      readonly AUTH_KEYCLOAK_ID: string;
      readonly AUTH_KEYCLOAK_SECRET: string;
      readonly AUTH_KEYCLOAK_ISSUER: string;
      readonly AUTH_KEYCLOAK_REALM: string;
      readonly AUTH_KEYCLOAK_ADMIN_CLIENT_ID: string;
      readonly AUTH_KEYCLOAK_ADMIN_CLIENT_SECRET: string;
      readonly AUTH_KEYCLOAK_SCOPE: string;
      readonly VITE_KEYCLOAK_URL: string;
      readonly AUTH_TRUST_HOST: boolean;
      readonly AUTH_DEBUG: boolean;
      // Backend environment
      readonly VITE_BACKEND_URL: string;
      readonly VITE_X_API_KEY_NAME: string;
      readonly X_API_KEY: string;
      readonly VITE_API_TIMEOUT: number;
      // CMS
      readonly VITE_STRAPI_GQL_URL: string;
      readonly STRAPI_API_KEY: string;
      readonly STRAPI_PREVIEW_SECRET: string;
      // Google Maps
      readonly VITE_GOOGLE_MAPS_API_KEY: string;
      readonly VITE_GOOGLE_MAP_ID: string;
      // Cache
      readonly CACHE_ADAPTER: string;
      readonly REDIS_ENDPOINT: string;
      readonly REDIS_USERNAME: string;
      readonly REDIS_PASSWORD: string;
      readonly UPSTASH_REDIS_REST_URL: string;
      readonly UPSTASH_REDIS_REST_TOKEN: string;
      // Email
      readonly SMTP_HOST: string;
      readonly SMTP_PORT: number;
      readonly SMTP_USERNAME: string;
      readonly SMTP_PASSWORD: string;
      readonly EMAIL_FROM: string;
      readonly EMAIL_REPLY_TO: string;
      // Body limits
      readonly JSON_BODY_LIMIT: string;
      readonly FORM_BODY_LIMIT: string;
      readonly TEXT_BODY_LIMIT: string;
      // Rate limits
      readonly VITE_RATE_LIMIT_TOKENS: number;
      readonly VITE_RATE_LIMIT_DURATION: string;
      // Analytics
      readonly VITE_ANALYTICS_ID: string;
      readonly VITE_GTM_ID: string;
      readonly VITE_GTM_AUTH: string;
      readonly VITE_GTM_PREVIEW: string;
      // CORS
      readonly CORS_WHITELIST: string;
      readonly ALLOWED_DOMAINS: string;
      readonly ALLOWED_METHODS: string;
      readonly ALLOWED_HEADERS: string;
      // PWA
      readonly VITE_VAPID_PUBLIC_KEY: string;
      readonly VAPID_PRIVATE_KEY: string;
      // CSP
      readonly CSP_REPORT_URI: string;
      readonly ENABLE_CSP_REPORTING: boolean;
      readonly ALLOW_ANALYTICS: boolean;
      readonly STRICT_CSP: boolean;
      // Miscellaneous
      readonly MINIFY_DICTIONARY: boolean;
      readonly COMMITS_CHECK_URL: string;
      readonly COMMITS_CHECK_ACCESS_TOKEN: string;
    }
  }
}

// Trick to make this a valid module:
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
