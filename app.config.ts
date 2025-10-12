import { defineConfig } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';
/* @ts-expect-error mdx is a valid plugin */
import pkg from '@vinxi/plugin-mdx';
import { VitePWA } from 'vite-plugin-pwa';

const { default: mdx } = pkg;

export default defineConfig({
  extensions: ['mdx', 'md'],
  vite: {
    plugins: [
      tailwindcss(),
      mdx.withImports({})({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
      }),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
          type: 'module',
          suppressWarnings: true,
        },
        useCredentials: true,
        manifest: false,
        injectManifest: {
          swSrc: 'public/sw.js',
          // Disable precaching completely for SolidJS Start SSR
          globPatterns: [],
          globIgnores: ['**/*'],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,ico,png,jpg,jpeg,svg,woff2,woff,ttf,eot}'],
          navigateFallback: null,
          navigateFallbackDenylist: [/^\/api\//],
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
              },
            },
            {
              urlPattern: /\.(?:html)$/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'html-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24, // 1 day
                },
              },
            },
          ],
        },
        includeAssets: [
          // Core PWA assets
          'favicon.ico',
          'favicon.svg',
          'manifest.webmanifest',
          'humans.txt',

          // Icons and branding
          'logo.svg',
          'logo.dark.svg',
          'icons/apple-touch-icon.png',
          'icons/android-chrome-192x192.png',
          'icons/android-chrome-512x512.png',
          'icons/icon512_maskable.png',
          'icons/icon512_rounded.png',
          'icons/favicon-16x16.png',
          'icons/favicon-32x32.png',
          'icons/favicon-96x96.png',
          'icons/mstile-150x150.png',
          'icons/safari-pinned-tab.svg',
          'icons/browserconfig.xml',

          // Fonts
          'fonts/Mona-Sans.woff2',
          'fonts/Tajawal-Bold.woff2',
          'fonts/Tajawal-Light.woff2',
          'fonts/Tajawal-Medium.woff2',
          'fonts/Tajawal-Regular.woff2',

          // Screenshots for PWA
          'screenshots/home.png',

          // Key images and SVGs
          'images/commitment.png',
          'images/search-on-map.png',
          'images/not-available.png',
          'images/no-image.svg',
          'images/no-profile-picture.svg',
          'images/no-profile-picture-female.svg',

          // SVG icons
          'svg/2fa.svg',
          'svg/customer-satisfaction.svg',
          'svg/no-guests.svg',
          'svg/no-payment-method.svg',
          'svg/no-pending-invoices.svg',
          'svg/not-found.svg',
          'svg/password.svg',
          'svg/private.svg',
          'svg/SearchDesktop.svg',
          'svg/settings.svg',
          'svg/sso.svg',
          'svg/timing-out.svg',
          'svg/total-revenue.svg',
          'svg/volume.svg',
        ],
      }),
    ],
  },
  server: {
    prerender: {
      crawlLinks: false,
    },
  },
  middleware: 'src/middleware/index.ts',
});
