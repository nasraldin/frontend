import pino from 'pino';

// Create logger instance
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

const logger = pino({
  level: isProduction ? 'info' : 'debug',
  transport: isDevelopment
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
