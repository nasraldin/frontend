/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  // Core formatting options
  printWidth: 84,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  proseWrap: 'always',
  endOfLine: 'lf',

  // Import sorting configuration
  importOrder: [
    // Solid JS
    '^(@solidjs/(.*)$)|^(@solidjs$)',

    // Third party modules
    '<THIRD_PARTY_MODULES>',

    // Local modules
    '',
    '^~/.*',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],

  // Tailwind CSS configuration
  tailwindAttributes: ['theme'],
  tailwindFunctions: ['clsx', 'cva', 'tw', 'cn', 'twMerge', 'createTheme'],

  // Plugins
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
};

export default config;
