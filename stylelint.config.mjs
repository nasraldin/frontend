/**
 * @see https://stylelint.io/user-guide/configuration
 * @type {import("stylelint").Config}
 */
const config = {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'responsive',
          'screen',
          'import',
          'variant',
          'theme',
          'utility',
          'custom-variant',
          'plugin',
        ],
      },
    ],
    'at-rule-no-deprecated': [
      true,
      {
        ignoreAtRules: ['apply'],
      },
    ],
    'selector-class-pattern': null,
    'declaration-block-no-duplicate-properties': true,
    'no-invalid-position-at-import-rule': null,
    'import-notation': null,
    'no-duplicate-selectors': null,
  },
};

export default config;
