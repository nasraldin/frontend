declare module '@vinxi/plugin-mdx' {
  interface MDXOptions {
    jsx?: boolean;
    jsxImportSource?: string;
    providerImportSource?: string;
  }

  interface MDXPlugin {
    withImports(
      imports: Record<string, unknown>,
    ): (options: MDXOptions) => import('vite').PluginOption;
  }

  interface MDXModule {
    default: MDXPlugin;
  }

  const mdx: MDXModule;
  export default mdx;
}
