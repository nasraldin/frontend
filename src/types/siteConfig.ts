import { FooterNavItem, MainNavItem, SidebarNavItem } from '~/models/nav';
import { BorderRadius, ColorScheme, FontSize, Theme } from '~/types/global';

export interface SiteConfig {
  appId: string;
  appVersion: string;
  appName: {
    ar: string;
    en: string;
  };
  lastUpdated: Date;
  defaultTheme: {
    theme: Theme;
    color: ColorScheme;
    fontSize: FontSize;
    radius: BorderRadius;
    disableTransitionOnChange: boolean;
    enableColorScheme: boolean;
    storageKey: string;
  };
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  footerNav: FooterNavItem[];
  paginationOptions: {
    pageSizeDefault: number;
    maxPageCountDefault: number;
  };
  cacheTime: number;
  queryCacheTime: {
    listings: {
      staleTime: number;
      gcTime: number;
    };
    availability: {
      staleTime: number;
      gcTime: number;
    };
    userProfilesAndReviews: {
      staleTime: number;
      gcTime: number;
    };
    searchResults: {
      staleTime: number;
      gcTime: number;
    };
  };
  media: {
    maxFileSize: number;
    mimeType: {
      file: string[];
      image: string[];
      video: string[];
    };
    allowedExtension: {
      file: string[];
      image: string[];
      video: string[];
    };
  };
  contactInfo: {
    email: string;
    phone: string;
    headquarters: {
      ar: string;
      en: string;
    };
    socialLinks: {
      x: string;
      facebook: string;
      instagram: string;
      linkedin: string;
    };
  };
  copyright(locale: AppLocale): string;
  // config: typeof import('~/config/app.config.json');
}
