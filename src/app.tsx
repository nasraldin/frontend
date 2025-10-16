import { MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { ErrorBoundary, Suspense } from 'solid-js';

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
            <Suspense>
              <ErrorBoundary fallback={<div>Error by Nasr</div>}>
                {props.children}
              </ErrorBoundary>
            </Suspense>
          </QueryClientProvider>
          <ReloadPrompt />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
