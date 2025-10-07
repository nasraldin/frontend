import { defineConfig } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';
/* @ts-expect-error mdx is a valid plugin */
import pkg from '@vinxi/plugin-mdx';

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
    ],
  },
  server: {
    prerender: {
      crawlLinks: true,
    },
  },
  // middleware: 'src/middleware.ts',
});
