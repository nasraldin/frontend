import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginSecurity from 'eslint-plugin-security';
import pluginSolid from 'eslint-plugin-solid';
import pluginTailwind from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import noDirectProcessEnv from './scripts/no-direct-process-env.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const tsConfig = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
);

const eslintConfig = [
  ...tsConfig,
  ...compat.extends('prettier'),
  ...pluginQuery.configs['flat/recommended'],
  pluginPrettierRecommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      security: pluginSecurity,
      prettier: pluginPrettier,
      tailwindcss: pluginTailwind,
      solid: pluginSolid,
      'custom-rules': {
        rules: {
          'no-direct-process-env': noDirectProcessEnv,
        },
      },
    },
  },
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    rules: {
      'linebreak-style': ['error', 'unix'],
      'no-console': 'error',
      'no-unused-vars': 'off',
      'no-duplicate-imports': 'error',
      'no-empty-function': 'warn',
      'no-empty-pattern': 'warn',
      'no-plusplus': [
        'warn',
        {
          allowForLoopAfterthoughts: true,
        },
      ],
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
      semi: ['error', 'always'],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': [
        1,
        {
          allowInterfaces: 'with-single-extends',
        },
      ],
      'no-restricted-globals': ['error', 'process'],
      'custom-rules/no-direct-process-env': 'error',
    },
  },
  {
    // Allow process.env in environment configuration files
    files: [
      'src/env/**/*.{js,mjs,ts,tsx}',
      'src/lib/env-utils/**/*.ts',
      'scripts/**/*.{js,mjs,ts,tsx}',
      'public/sw.js',
      '*.config.{js,mjs,ts}',
      '**/__tests__/__fixtures__/**/*.{js,mjs,ts,tsx}',
      '**/__tests__/__mocks__/**/*.{js,mjs,ts,tsx}',
    ],
    rules: {
      'no-console': 'off',
      'no-restricted-globals': 'off',
      'custom-rules/no-direct-process-env': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
  {
    settings: {
      tailwindcss: {
        config: `${__dirname}/src/styles/app.css`,
        callees: [
          'classnames',
          'clsx',
          'ctl',
          'cva',
          'tw',
          'cn',
          'twMerge',
          'createTheme',
        ],
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [
          '(app\\-).*',
          '(app\\_).*',
          '(theme\\-).*',
          'toaster',
          'destructive',
          'aspect-square',
          'aspect-video',
          'origin-top-center',
        ],
        classRegex: '^(class(Name)|theme)?$',
      },
    },
  },
  {
    ignores: [
      'node_modules/**',
      'out/**',
      'dist/**',
      '.vinxi/**',
      '.output/**',
      '.history/**',
      '.trash/**',
      '*.d.json.ts',
      '.husky/install.mjs',
    ],
  },
];

export default eslintConfig;
