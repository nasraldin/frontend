import { generateNonce } from '~/utils/helpers';
import { logger } from '~/utils/logger';

interface CSPConfig {
  isDev: boolean;
  reportOnly?: boolean;
  reportUri?: string;
  nonce?: string;
}

interface CSPDirectives {
  defaultSrc: string[];
  scriptSrc: string[];
  scriptSrcElem?: string[];
  objectSrc: string[];
  styleSrc: string[];
  styleSrcAttr?: string[];
  styleSrcElem?: string[];
  imgSrc: string[];
  fontSrc: string[];
  connectSrc: string[];
  frameSrc: string[];
  frameAncestors: string[];
  mediaSrc: string[];
  formAction: string[];
  baseUri: string[];
  manifestSrc: string[];
  upgradeInsecureRequests?: string[];
  requireTrustedTypesFor?: string[];
}

const cspDomains = {
  dev: [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://localhost:80',
    'http://localhost',
  ],
  app: ['https://*.ajrly.com'],
  google: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://ssl.google-analytics.com',
    'https://analytics.google.com',
  ],
  cloudflare: ['https://*.cloudflare.com', 'https://*.cloudflareinsights.com'],
  // Domains for images
  imgSrc: [
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
    'https://stats.g.doubleclick.net',
  ],
  // Domains for API connections
  connectSrc: [
    'https://www.google-analytics.com',
    'https://analytics.google.com',
    'https://stats.g.doubleclick.net',
    'https://static.cloudflareinsights.com',
    'https://*.cloudflareinsights.com',
  ],
  fontSrc: ['https://fonts.gstatic.com'],
} as const;

const scriptSrcElemDomains = [
  ...cspDomains.app,
  'https://www.googletagmanager.com',
  ...cspDomains.cloudflare,
] as const;

export const generateCSP = ({
  isDev,
  reportOnly = false,
  reportUri = '/api/csp-report',
  nonce,
}: CSPConfig) => {
  // Ensure nonce is always available
  const _nonce = nonce || generateNonce();
  const cspDev = isDev ? cspDomains.dev : ([] as const);
  const cspDevScript = isDev
    ? (["'unsafe-inline'", "'unsafe-eval'"] as const)
    : ([] as const);

  // Base CSP directives
  const baseDirectives: CSPDirectives = {
    // Default fallback
    defaultSrc: ["'self'"],

    // Scripts - SECURITY: Remove unsafe-inline in production
    scriptSrc: [
      "'self'",
      "'strict-dynamic'",
      // In development, don't include nonce if unsafe-inline is present
      // because nonce makes unsafe-inline ignored per CSP spec
      ...(isDev ? [] : [`'${_nonce}'`]),
      ...(isDev ? ["'unsafe-inline'", "'unsafe-eval'"] : []),
      ...cspDevScript,
      ...cspDev,
    ],
    // Script element loading
    scriptSrcElem: [
      "'self'",
      ...scriptSrcElemDomains,
      ...cspDevScript,
      ...cspDev,
      // In development, don't include nonce if unsafe-inline is present
      // because nonce makes unsafe-inline ignored per CSP spec
      ...(isDev ? [] : [`'${_nonce}'`]),
    ],

    // Prevent plugin execution
    objectSrc: ["'none'"],

    // Styles
    styleSrc: [`'${_nonce}'`, "'self'"],
    // Style attributes
    styleSrcAttr: [
      "'self'",
      "'unsafe-inline'", // Required for SolidJS inline styles
    ],
    // Style elements
    styleSrcElem: [
      "'self'",
      "'unsafe-inline'", // Required for SolidJS inline styles
    ],

    // Images
    imgSrc: ["'self'", 'https:', 'data:', 'blob:'],

    // Fonts
    // fontSrc: ["'self'"],
    fontSrc: ["'self'", 'data:', ...cspDomains.fontSrc],

    // Connect (API endpoints, etc)
    connectSrc: [
      "'self'",
      ...cspDomains.app,
      ...cspDomains.connectSrc,
      ...cspDomains.cloudflare,
      // Allow WebSocket in development
      ...(isDev ? ['ws:', 'wss:'] : []),
    ],

    // Frame/iframe sources
    frameSrc: ["'self'", ...cspDomains.app],
    frameAncestors: ["'none'"],

    // Media
    mediaSrc: ["'self'"],

    // Forms
    formAction: ["'self'"],

    // Base URI
    baseUri: ["'self'"],

    // Manifest
    manifestSrc: ["'self'"],

    upgradeInsecureRequests: [],
    // requireTrustedTypesFor: ["'script'"],
  };

  // Stricter directives for report-only mode
  const strictDirectives = {
    ...baseDirectives,
  };

  // The upgradeInsecureRequests directive will be present in
  // the regular policy but not in the strict policy.
  delete strictDirectives['upgradeInsecureRequests'];

  // Convert directives object to CSP string
  const directivesToString = (directives: CSPDirectives) => {
    return Object.entries(directives)
      .filter(([_, values]) => values !== undefined)
      .map(([key, values]) => {
        // Convert camelCase to kebab-case
        const directive = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
        return `${directive} ${values.join(' ')}`;
      })
      .join('; ');
  };

  // Add reporting directives if needed
  const addReportingDirectives = (policy: string) => {
    if (reportUri) {
      return `${policy}; report-uri ${reportUri}; report-to csp-endpoint`;
    }
    return policy;
  };

  // Generate policies
  const regularPolicy = addReportingDirectives(directivesToString(baseDirectives));
  const strictPolicy = addReportingDirectives(directivesToString(strictDirectives));

  logger.info(
    {
      csp: { isDev, reportOnly, reportUri, nonce },
      regularPolicy,
      strictPolicy,
    },
    'generateCSP',
  );

  return {
    // If reportOnly is true, return strict policy as regular and undefined as strict
    // If reportOnly is false, return regular policy as regular and strict policy as strict
    regular: reportOnly ? strictPolicy : regularPolicy,
    strict: reportOnly ? undefined : strictPolicy,
  };
};
