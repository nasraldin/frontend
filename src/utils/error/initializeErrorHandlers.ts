import { isServer } from '~/utils/env';
import { logger } from '~/utils/logger';

import { errHandler } from './appError';

let handlersInitialized = false;

export function initializeErrorHandlers() {
  if (isServer || handlersInitialized) return;

  process.on('unhandledRejection', (err: Error, source) => {
    errHandler.logError({ err, source });
    if (!errHandler.isTrustedError(err)) {
      logger.error({ err }, 'Unhandled Rejection:');
      process.exit(1);
    }
  });

  process.on('uncaughtException', (err, source) => {
    logger.error({ err }, 'Uncaught Exception:');
    errHandler.logError({ err, source });
  });

  process.on('SIGTERM', (err: Error) => {
    logger.error({ err }, 'SIGTERM signal received: Closing server.');
    errHandler.logError({ err });
  });

  handlersInitialized = true;
}
