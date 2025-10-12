// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';

import AppHead from '~/components/Head';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" dir="ltr">
        <head>
          <AppHead />
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
