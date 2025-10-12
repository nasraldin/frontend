// import {
//   Cairo,
//   Cairo_Play,
//   Inter,
//   Mona_Sans,
//   Noto_Sans_Arabic,
//   Open_Sans,
//   Playpen_Sans,
//   Roboto,
//   Rubik,
//   Tajawal,
//   Ubuntu,
// } from 'next/font/google';

// import { DEFAULT_LOCALE } from '~/i18n';
// import { cn } from '~/utils/css';

// // All font loaders must be at module scope
// const monaSansFont = Mona_Sans({
//   weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
//   style: 'normal',
//   subsets: ['latin'],
//   display: 'swap',
//   preload: true,
//   variable: '--font-mona-sans',
// });

// const tajawalFont = Tajawal({
//   weight: ['200', '300', '400', '500', '700', '800', '900'],
//   style: 'normal',
//   subsets: ['arabic'],
//   display: 'swap',
//   preload: true,
//   variable: '--font-tajawal',
// });

// const robotoFont = Roboto({
//   weight: ['300', '400', '500', '700'],
//   style: 'normal',
//   subsets: ['latin'],
//   display: 'swap',
//   preload: false,
//   variable: '--font-roboto',
// });

// const interFont = Inter({
//   weight: ['300', '400', '500', '600', '700'],
//   style: 'normal',
//   subsets: ['latin'],
//   display: 'swap',
//   preload: false,
//   variable: '--font-inter',
// });

// const openSansFont = Open_Sans({
//   weight: ['300', '400', '500', '600', '700', '800'],
//   style: 'normal',
//   subsets: ['latin'],
//   display: 'swap',
//   preload: false,
//   variable: '--font-open-sans',
// });

// const rubikFont = Rubik({
//   weight: ['300', '400', '500', '600', '700'],
//   style: 'normal',
//   subsets: ['latin'],
//   display: 'swap',
//   preload: false,
//   variable: '--font-rubik',
// });

// const ubuntuFont = Ubuntu({
//   weight: ['300', '400', '500', '700'],
//   style: 'normal',
//   subsets: ['latin'],
//   display: 'swap',
//   preload: false,
//   variable: '--font-ubuntu',
// });

// const cairoFont = Cairo({
//   weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
//   style: 'normal',
//   subsets: ['arabic'],
//   display: 'swap',
//   preload: false,
//   variable: '--font-cairo',
// });

// const cairoPlayFont = Cairo_Play({
//   weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
//   style: 'normal',
//   subsets: ['arabic'],
//   display: 'swap',
//   preload: false,
//   variable: '--font-cairo-play',
// });

// const notoSansArabicFont = Noto_Sans_Arabic({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   style: 'normal',
//   subsets: ['arabic'],
//   display: 'swap',
//   preload: false,
//   variable: '--font-noto-sans-arabic',
// });

// const playpenSansFont = Playpen_Sans({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
//   style: 'normal',
//   subsets: ['latin'],
//   display: 'swap',
//   preload: false,
//   variable: '--font-playpen-sans',
// });

// // Font definitions - reference the loaded fonts
// const fontDefinitions = {
//   // English Fonts
//   'mona-sans': {
//     font: monaSansFont,
//     label: 'Mona Sans',
//     description: 'Modern sans-serif',
//     preload: true,
//   },
//   roboto: {
//     font: robotoFont,
//     label: 'Roboto',
//     description: 'Clean and readable',
//     preload: false,
//   },
//   inter: {
//     font: interFont,
//     label: 'Inter',
//     description: 'Optimized for screens',
//     preload: false,
//   },
//   'open-sans': {
//     font: openSansFont,
//     label: 'Open Sans',
//     description: 'Humanist sans-serif',
//     preload: false,
//   },
//   rubik: {
//     font: rubikFont,
//     label: 'Rubik',
//     description: 'Geometric sans-serif',
//     preload: false,
//   },
//   ubuntu: {
//     font: ubuntuFont,
//     label: 'Ubuntu',
//     description: 'Modern and friendly',
//     preload: false,
//   },

//   // Arabic Fonts
//   tajawal: {
//     font: tajawalFont,
//     label: 'Tajawal',
//     description: 'Arabic-friendly',
//     preload: true,
//   },
//   cairo: {
//     font: cairoFont,
//     label: 'Cairo',
//     description: 'Modern Arabic font',
//     preload: false,
//   },
//   'cairo-play': {
//     font: cairoPlayFont,
//     label: 'Cairo Play',
//     description: 'Playful Arabic font',
//     preload: false,
//   },
//   'noto-sans-arabic': {
//     font: notoSansArabicFont,
//     label: 'Noto Sans Arabic',
//     description: 'Google Arabic font',
//     preload: false,
//   },
//   'playpen-sans': {
//     font: playpenSansFont,
//     label: 'Playpen Sans Arabic',
//     description: 'Modern Arabic sans-serif',
//     preload: false,
//   },
// } as const;

// // Font categories for UI organization
// export const FONT_CATEGORIES = {
//   english: {
//     'mona-sans': fontDefinitions['mona-sans'],
//     roboto: fontDefinitions.roboto,
//     inter: fontDefinitions.inter,
//     'open-sans': fontDefinitions['open-sans'],
//     rubik: fontDefinitions.rubik,
//     ubuntu: fontDefinitions.ubuntu,
//     // Bilingual fonts that work for both English and Arabic
//     'playpen-sans': fontDefinitions['playpen-sans'],
//     'noto-sans-arabic': fontDefinitions['noto-sans-arabic'],
//   },
//   arabic: {
//     tajawal: fontDefinitions.tajawal,
//     cairo: fontDefinitions.cairo,
//     'cairo-play': fontDefinitions['cairo-play'],
//     'noto-sans-arabic': fontDefinitions['noto-sans-arabic'],
//     'playpen-sans': fontDefinitions['playpen-sans'],
//   },
// } as const;

// // Only export the default font variables for initial load
// export const fontVariables = cn(monaSansFont.variable, tajawalFont.variable);

// export const getFontclass = (locale: string = DEFAULT_LOCALE): string => {
//   return isArabic(locale) ? tajawalFont.class : monaSansFont.class;
// };

// // Utility function to get font variables for a specific font family
// export const getFontVariables = (
//   fontFamily: keyof typeof fontDefinitions,
// ): string => {
//   const fontDef = fontDefinitions[fontFamily];
//   if (!fontDef?.font) return '';
//   return fontDef.font.variable;
// };

// // Utility function to get font class name for a specific font family
// export const getFontClass = (fontFamily: keyof typeof fontDefinitions): string => {
//   const fontDef = fontDefinitions[fontFamily];
//   if (!fontDef?.font) return '';
//   return fontDef.font.class;
// };

// export type FontFamily = keyof typeof fontDefinitions;
