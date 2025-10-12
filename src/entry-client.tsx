// @refresh reload
import { mount, StartClient } from '@solidjs/start/client';

import '~/lib/hello';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
mount(() => <StartClient />, document.getElementById('app')!);

// export default function startApp() {
//   const appElement = document.getElementById('app');
//   if (appElement) {
//     mount(() => <StartClient />, appElement);
//   } else {
//     throw new Error('App not mounted!');
//   }
// }
// startApp();
