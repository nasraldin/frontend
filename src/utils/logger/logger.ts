import pino from 'pino';

import { env } from '~/env';
import { isDev } from '~/utils/env';

/**
 * App logger instance
 * @returns The logger
 */
export const logger = pino({
  level: env.LOG_LEVEL,
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err,
  },
});

// Create child logger for request tracing
export const createRequestLogger = (requestId: string) => {
  return logger.child({ requestId });
};

// Create child logger for specific modules
export const createModuleLogger = (module: string) => {
  return logger.child({ module });
};

export default logger;
