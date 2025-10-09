import { Component, createEffect, onMount } from 'solid-js';

import { useLogger } from '~/utils/logger';

const LoggedComponent: Component = () => {
  const logger = useLogger('LoggedComponent');

  onMount(() => {
    logger.info('Component mounted');
  });

  createEffect(() => {
    logger.debug('Component effect running');
  });

  const handleClick = () => {
    logger.info('Button clicked');
  };

  const handleError = () => {
    try {
      throw new Error('Test error');
    } catch (error) {
      logger.error({ error }, 'Error occurred in component');
    }
  };

  return (
    <div>
      <h2>Logged Component</h2>
      <button onClick={handleClick}>Log Info</button>
      <button onClick={handleError}>Log Error</button>
    </div>
  );
};

export default LoggedComponent;
