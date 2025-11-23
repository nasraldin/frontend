import { JSX } from 'solid-js';

import { siteConfig } from '~/config/site.config';
import { DEFAULT_LOCALE } from '~/i18n';
import { isArabic } from '~/utils/helpers';

const AppHead = ({
  locale = DEFAULT_LOCALE,
  assets,
  title,
  description,
  canonicalUrl,
  ogImage,
}: {
  locale?: AppLocale;
  assets?: JSX.Element;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}) => {
  const localePath = isArabic(locale) ? '/ar/' : '/';
  const isRTL = isArabic(locale);
  const baseUrl = 'https://ajrly.com';
  const currentUrl = canonicalUrl || baseUrl;
  const pageTitle =
    title ||
    `${siteConfig.appName[locale]} | ${isRTL ? 'البحث عن العقارات' : 'Property Finder'}`;
  const pageDescription =
    description ||
    (isRTL
      ? 'تصفح أكبر مخزون من العقارات السكنية والتجارية للبيع والإيجار. اعثر على منزل أحلامك مع فلاتر البحث المتقدمة والتواصل المباشر مع أصحاب العقارات.'
      : 'Explore the largest inventory of residential properties and commercial real estate for sale and rent. Find your dream home with advanced search filters and direct contact with property owners.');
  const ogImageUrl = ogImage || `${baseUrl}/screenshots/home.png`;

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: siteConfig.appName[locale],
    description: pageDescription,
    url: currentUrl,
    logo: `${baseUrl}/logo.svg`,
    image: ogImageUrl,
    telephone: siteConfig.contactInfo.phone,
    email: siteConfig.contactInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: isRTL ? 'أبو ظبي' : 'Abu Dhabi',
      addressCountry: 'AE',
    },
    sameAs: [
      siteConfig.contactInfo.socialLinks.x,
      siteConfig.contactInfo.socialLinks.facebook,
      siteConfig.contactInfo.socialLinks.instagram,
      siteConfig.contactInfo.socialLinks.linkedin,
    ],
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
    serviceType: 'Real Estate Services',
  };

  return (
    <>
      {/* Essential Meta Tags */}
      <meta charset="utf-8" />
      <meta name="description" content={pageDescription} />
      <meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1, viewport-fit=cover"
      />

      {/* Theme and Color */}
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#1E2226"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#ffffff"
      />
      <meta name="color-scheme" content="light dark" />

      {/* Favicons and Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/icons/favicon-96x96.png"
      />
      <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-touch-icon.png"
      />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#ffffff" />

      {/* PWA Manifest */}
      <link
        rel="manifest"
        href={`${localePath}manifest.webmanifest`}
        crossOrigin="use-credentials"
      />

      {/* App Meta */}
      <meta name="application-name" content={siteConfig.appName[locale]} />
      <meta name="generator" content="Ajrly" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-title"
        content={siteConfig.appName[locale]}
      />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-itunes-app" content="app-id=com.ajrly" />

      {/* Apple Touch Startup Images */}
      <link
        href="/images/apple-touch-startup-image-768x1004.png"
        rel="apple-touch-startup-image"
      />
      <link
        href="/images/apple-touch-startup-image-1536x2008.png"
        media="(device-width: 768px) and (device-height: 1024px)"
        rel="apple-touch-startup-image"
      />

      {/* SEO Meta Tags */}
      <meta
        name="keywords"
        content={
          isRTL
            ? 'عقارات للبيع, عقارات للإيجار, البحث عن منزل, شقق للبيع, فلل للبيع, عقارات تجارية, وكيل عقاري, شراء منزل, إيجار شقة'
            : 'property listings, real estate, buy home, apartment rental, house finder, rental properties, home search, property for sale, property for rent, property finder, UAE real estate, Dubai real estate, Abu Dhabi properties'
        }
      />
      <meta name="author" content="Nasr Aldin" />
      <meta name="creator" content="Nasr Aldin" />
      <meta name="publisher" content="Ajrly" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta
        name="googlebot"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="bingbot" content="index, follow" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />

      {/* Security Headers */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* Canonical and Alternate URLs */}
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hreflang="en" href={`${baseUrl}/en`} />
      <link rel="alternate" hreflang="ar" href={`${baseUrl}/ar`} />
      <link rel="alternate" hreflang="x-default" href={baseUrl} />
      <link rel="alternate" type="application/rss+xml" href={`${baseUrl}/rss`} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteConfig.appName[locale]} />
      <meta property="og:locale" content={isRTL ? 'ar_AE' : 'en_AE'} />
      <meta property="og:image" content={ogImageUrl} />
      <meta
        property="og:image:alt"
        content={isRTL ? 'أجرلي - البحث عن العقارات' : 'Ajrly - Real Estate Search'}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ajrlyapp" />
      <meta name="twitter:creator" content="@_nasraldin" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta
        name="twitter:image:alt"
        content={isRTL ? 'أجرلي - البحث عن العقارات' : 'Ajrly - Real Estate Search'}
      />

      {/* App Links */}
      <meta property="al:ios:app_name" content={siteConfig.appName[locale]} />
      <meta property="al:ios:url" content={currentUrl} />
      <meta property="al:android:app_name" content={siteConfig.appName[locale]} />
      <meta property="al:android:package" content="com.ajrly" />
      <meta property="al:android:url" content={currentUrl} />
      <meta property="al:web:url" content={currentUrl} />

      {/* Performance Optimization */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />

      {/* Critical Resource Preloading */}
      <link
        rel="preload"
        href="https://www.googletagmanager.com/gtm.js?id=GTM-WN5ZS8W"
        as="script"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://www.googletagmanager.com/gtag/js?id=G-1V0YWBCMDX"
        as="script"
        crossOrigin="anonymous"
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        innerHTML={JSON.stringify(structuredData)}
      />

      {assets}
    </>
  );
};

export default AppHead;
