import {
  ColorVariant,
  FontSize,
  RadiusSize,
  THEME_LS_KEY,
  ThemeMode,
} from '~/constants';
import { DEFAULT_LOCALE } from '~/i18n';
import { SiteConfig } from '~/types';

import appConfigJson from './app.config.json';
import { AuthRoutes, OtherRoutes, PageRoutes, UserRoutes } from './routes';

export const siteConfig: SiteConfig = {
  appId: appConfigJson.appId,
  appVersion: appConfigJson.version,
  appName: appConfigJson.appName,
  lastUpdated: new Date(appConfigJson.lastUpdated),
  defaultTheme: {
    theme: ThemeMode.Light,
    color: ColorVariant.Default,
    fontSize: FontSize.Base,
    radius: RadiusSize.Medium,
    disableTransitionOnChange: true,
    enableColorScheme: true,
    storageKey: THEME_LS_KEY,
  },
  mainNav: [
    {
      title: 'routes.lookingFor',
      items: [
        {
          title: 'routes.sale',
          href: PageRoutes.Sale,
          icon: 'ForSale',
        },
        {
          title: 'routes.rent',
          href: PageRoutes.Rent,
          icon: 'ForRent',
        },
        {
          title: 'routes.buy',
          href: PageRoutes.Buy,
          icon: 'ForBuy',
          disabled: true,
        },
        {
          title: 'routes.holidays',
          href: PageRoutes.Holidays,
          icon: 'HolidayIn',
        },
        {
          title: 'routes.newProjects',
          href: PageRoutes.NewProjects,
          icon: 'NewProjects',
        },
      ],
    },
    {
      title: 'routes.find',
      items: [
        {
          title: 'routes.findAgent',
          href: PageRoutes.FindAgent,
        },
        {
          title: 'routes.findBroker',
          href: PageRoutes.FindBroker,
        },
      ],
    },
    {
      title: 'routes.explore',
      items: [
        {
          title: 'routes.trends',
          href: PageRoutes.Trends,
        },
        {
          title: 'routes.pricing',
          href: PageRoutes.Pricing,
        },
        {
          title: 'routes.mortgage',
          href: PageRoutes.Mortgage,
        },
        {
          title: 'routes.events',
          href: PageRoutes.Events,
        },
        {
          title: 'routes.blog',
          href: OtherRoutes.Blog,
          external: true,
        },
      ],
    },
    {
      title: 'appName',
      items: [
        {
          title: 'routes.about',
          href: PageRoutes.About,
        },
        {
          title: 'routes.becomePartner',
          href: PageRoutes.BecomePartner,
        },
        {
          title: 'routes.jobs',
          href: PageRoutes.Jobs,
        },
        {
          title: 'routes.policiesCenter',
          href: PageRoutes.PoliciesCenter,
        },
      ],
    },
  ],
  sidebarNav: [],
  footerNav: [
    {
      title: 'routes.company',
      items: [
        {
          title: 'routes.about',
          href: PageRoutes.About,
          items: [],
        },
        {
          title: 'routes.pricing',
          href: PageRoutes.Pricing,
          items: [],
        },
        {
          title: 'routes.advertising',
          href: PageRoutes.Advertising,
          items: [],
        },
        {
          title: 'routes.jobs',
          href: PageRoutes.Jobs,
          items: [],
        },
        {
          title: 'routes.blog',
          href: OtherRoutes.Blog,
          items: [],
        },
      ],
    },
    {
      title: 'routes.account',
      items: [
        {
          title: 'routes.signInOrSignUp',
          href: AuthRoutes.Auth,
          items: [],
        },
        {
          title: 'routes.yourAccount',
          href: UserRoutes.Profile,
          items: [],
        },
      ],
    },
    {
      title: 'routes.otherCountries',
      items: [
        {
          title: 'countryList.egypt',
          href: '/search?country=egypt',
          items: [],
        },
        {
          title: 'countryList.saudiArabia',
          href: '/search?country=saudi-arabia',
          items: [],
        },
        {
          title: 'routes.seeMore',
          href: PageRoutes.Countries,
          items: [],
        },
      ],
    },
    {
      title: 'routes.letUsHelpYou',
      items: [
        {
          title: 'routes.helpCenter',
          href: OtherRoutes.HelpCenter,
          items: [],
        },
        {
          title: 'routes.guestControls',
          href: '/preferences',
          items: [],
        },
        {
          title: 'routes.contactUs',
          href: PageRoutes.Contact,
          items: [],
        },
        {
          title: 'routes.faqs',
          href: PageRoutes.Faqs,
          items: [],
        },
        {
          title: 'routes.sendFeedback',
          href: PageRoutes.Feedback,
          items: [],
        },
      ],
    },
  ],
  paginationOptions: {
    pageSizeDefault: 10,
    maxPageCountDefault: 10,
  },
  cacheTime: 60 * 60 * 24,
  queryCacheTime: {
    listings: {
      staleTime: 15 * 60 * 1000, // 15 minutes
      gcTime: 2 * 60 * 60 * 1000, // 2 hours
    },
    availability: {
      staleTime: 30 * 1000, // 30 seconds
      gcTime: 5 * 60 * 1000, // 5 minutes
    },
    userProfilesAndReviews: {
      staleTime: 60 * 60 * 1000, // 1 hour
      gcTime: 24 * 60 * 60 * 1000, // 24 hours
    },
    searchResults: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
    },
  },
  media: {
    maxFileSize: 20971520,
    mimeType: {
      file: [
        'multipart/mixed',
        'multipart/form-data',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
      ],
      image: ['image/jpeg', 'image/png', 'image/webp'],
      video: ['video/mp4'],
    },
    allowedExtension: {
      file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv'],
      image: ['jpg', 'jpeg', 'png'],
      video: ['mp4'],
    },
  },
  contactInfo: {
    email: 'support@ajrly.com',
    phone: '+971509519300',
    headquarters: {
      ar: 'أبو ظبي، الإمارات العربية المتحدة',
      en: 'Abu Dhabi, United Arab Emirates',
    },
    socialLinks: {
      x: 'https://x.com/ajrlyapp',
      facebook: 'https://www.facebook.com/ajrlyapp',
      instagram: 'https://www.instagram.com/ajrlyapp',
      linkedin: 'https://www.linkedin.com/company/ajrlyapp',
    },
  },
  copyright: (locale: AppLocale = DEFAULT_LOCALE) =>
    `© ${new Date().getFullYear()} ${appConfigJson.appName[locale]}.`,
  // config: appConfigJson,
};
