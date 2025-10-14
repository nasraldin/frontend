import { MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { Suspense } from 'solid-js';

import ReloadPrompt from '~/components/ReloadPrompt';

import './app.css';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <a href="/">Index</a>
          <a href="/about">About</a>
          <a href="/test">Test</a>
          <QueryClientProvider client={queryClient}>
            <Suspense>{props.children}</Suspense>
          </QueryClientProvider>
          <ReloadPrompt />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
