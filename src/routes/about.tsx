import { Title } from '@solidjs/meta';

import LoggedComponent from '~/components/LoggedComponent';

export default function About() {
  return (
    <main>
      <Title>About</Title>
      <h1>About</h1>
      <LoggedComponent />
    </main>
  );
}
