// import type { FetchEvent } from '@solidjs/start/server';

// import { AuthRoutes } from '~/config';
// import { auth } from '~/lib/auth';
// import { logger } from '~/utils/logger';

// import { getRequestContextValueTyped, setRequestContext } from './context';
// import type { AuthConfig, SolidMiddleware } from './types';

// /**
//  * Creates an authentication middleware for SolidJS Start
//  * @param config Authentication configuration
//  * @returns SolidJS Start middleware function
//  */
// export function createAuthMiddleware(config?: AuthConfig): SolidMiddleware {
//   const defaultConfig: AuthConfig = {
//     protectedRoutes: ['/dash', '/account'],
//     signInRoute: AuthRoutes.SignIn,
//     sessionCookieName: 'session',
//     ...config,
//   };

//   return async (event: FetchEvent) => {
//     const session = await auth();
//     logger.info({ isAuthenticated: !!session }, 'Middleware::authMiddleware');

//     // Define protected pathname prefixes
//     const { pathname } = new URL(event.request.url);
//     const isProtected = defaultConfig.protectedRoutes.some((route) =>
//       pathname.startsWith(route),
//     );

//     if (isProtected && !session) {
//       const url = new URL(defaultConfig.signInRoute, event.request.url);
//       url.searchParams.set(
//         'callbackUrl',
//         `${pathname}${new URL(event.request.url).search}`,
//       );

//       // For SolidJS Start, we need to return a redirect response
//       event.response = Response.redirect(url, 302);
//       return;
//     }

//     // Store session in request context for other middleware to access
//     setRequestContext(event, 'session', session);
//     setRequestContext(event, 'isAuthenticated', !!session);
//   };
// }

// /**
//  * Creates a conditional authentication middleware that only runs for protected routes
//  * @param config Authentication configuration
//  * @returns SolidJS Start middleware function
//  */
// export function createConditionalAuthMiddleware(
//   config?: AuthConfig,
// ): SolidMiddleware {
//   const authMiddleware = createAuthMiddleware(config);
//   const defaultConfig: AuthConfig = {
//     protectedRoutes: ['/dash', '/account'],
//     signInRoute: AuthRoutes.SignIn,
//     sessionCookieName: 'session',
//     ...config,
//   };

//   return async (event: FetchEvent) => {
//     const { pathname } = new URL(event.request.url);
//     const isProtected = defaultConfig.protectedRoutes.some((route) =>
//       pathname.startsWith(route),
//     );

//     if (isProtected) {
//       await authMiddleware(event);
//     }
//   };
// }

// /**
//  * Gets the session from the request context
//  */
// export function getSession(event: FetchEvent): unknown {
//   return getRequestContextValueTyped(event, 'session', undefined);
// }

// /**
//  * Checks if the user is authenticated
//  */
// export function isAuthenticated(event: FetchEvent): boolean {
//   return getRequestContextValueTyped(event, 'isAuthenticated', false);
// }

// /**
//  * Creates a middleware that requires authentication for all routes
//  * @param config Authentication configuration
//  * @returns SolidJS Start middleware function
//  */
// export function createRequireAuthMiddleware(config?: AuthConfig): SolidMiddleware {
//   const authMiddleware = createAuthMiddleware(config);
//   const defaultConfig: AuthConfig = {
//     protectedRoutes: ['/dash', '/account'],
//     signInRoute: AuthRoutes.SignIn,
//     sessionCookieName: 'session',
//     ...config,
//   };

//   return async (event: FetchEvent) => {
//     const { pathname } = new URL(event.request.url);

//     // Skip authentication for public routes
//     const publicRoutes = ['/api/auth', '/login', '/signup', '/'];
//     const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

//     if (!isPublicRoute) {
//       await authMiddleware(event);
//     }
//   };
// }
