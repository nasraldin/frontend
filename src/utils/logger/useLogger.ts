import { createModuleLogger } from './logger';

/**
 * Hook to use logger in components
 * @param module - The module name
 * @returns The logger
 */
export const useLogger = (module: string) => {
  const logger = createModuleLogger(module);
  return logger;
};

/**
 * Simple logger hook for components
 * @returns The logger
 */
export const useAppLogger = () => {
  return createModuleLogger('app');
};
