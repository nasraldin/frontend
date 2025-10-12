import config from './app.config.json';

export * from './google-maps';
export * from './routes';
export * from './site.config';

export const AppConfig = { ...config };
