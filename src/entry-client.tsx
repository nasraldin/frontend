// @refresh reload
import { mount, StartClient } from '@solidjs/start/client';

export default function startApp() {
  const appElement = document.getElementById('app');
  if (appElement) {
    mount(() => <StartClient />, appElement);
  }
}
