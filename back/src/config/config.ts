import { environment } from './environment';

export const config = {
  app: {
    env: environment.APP_NODE_ENV,
  },
  http: {
    port: environment.APP_PORT,
    host: environment.APP_HOST,
  },
  example: {
    message: environment.EXAMPLE_MESSAGE,
  },
  postgres: {
    url: environment.DATABASE_URL,
  },
};

export const devMode = config.app.env === 'development';
export const testMode = config.app.env === 'testing';
export const prodMode = config.app.env === 'production';

export type AppConfig = typeof config;
