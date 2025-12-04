import type { Environment } from '@api/app/app.env';
import * as schema from '@api/db/db.schema';
import { integrationTestFactory } from '@bltx/test';

declare global {
  interface ImportMetaEnv {
    CI: unknown;
  }
}

export const setupIntegrationTest = integrationTestFactory({
  schema,
  env: {
    PORT: 8080,

    WEB_ORIGIN: 'localhost',

    POSTGRES_HOSTNAME: 'localhost',
    POSTGRES_PORT: 5432,
    POSTGRES_DATABASE: 'test',
    POSTGRES_USERNAME: 'test',
    POSTGRES_PASSWORD: 'test',

    REDIS_HOSTNAME: 'localhost',
    REDIS_PORT: 6379,
    REDIS_USERNAME: 'test',
    REDIS_PASSWORD: 'test',
  } satisfies Environment,
  timeout: import.meta.env.CI ? 30_000 : 15_000,
});
