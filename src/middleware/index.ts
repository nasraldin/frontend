import { createMiddleware } from '@solidjs/start/middleware';

import { withCSP } from './withCSP';
import { withLogUuid } from './withLogUuid';

/**
 * Export the SolidJS Start middleware configuration
 */
export default createMiddleware({
  onRequest: [withLogUuid, withCSP],
  onBeforeResponse: (_event) => {
    // Handle any final response modifications here if needed
    // This runs after the route handler but before sending the response
  },
});
