// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';

import ServerHead from '~/components/ServerHead';
import { initializeSecurity } from '~/lib/security-init';
import { initializeErrorHandlers } from '~/utils/error/initializeErrorHandlers';

// Initialize error handlers and security. this it should be on top.
initializeErrorHandlers();
initializeSecurity();

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" dir="ltr">
        <head>
          <ServerHead />
          {assets}
        </head>
        <body id="app-body" class="antialiased">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
