import { createModuleLogger } from './logger';

// Hook to use logger in components
export const useLogger = (module: string) => {
  const logger = createModuleLogger(module);
  return logger;
};

// Simple logger hook for components
export const useAppLogger = () => {
  return createModuleLogger('app');
};
