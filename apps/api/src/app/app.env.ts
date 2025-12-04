import { type Static, t } from 'elysia';

export const EnvironmentDTO = t.Object({
  PORT: t.Number(),

  WEB_ORIGIN: t.String(),

  POSTGRES_HOSTNAME: t.String(),
  POSTGRES_PORT: t.Number(),
  POSTGRES_DATABASE: t.String(),
  POSTGRES_USERNAME: t.String(),
  POSTGRES_PASSWORD: t.String(),

  REDIS_HOSTNAME: t.String(),
  REDIS_PORT: t.Number(),
  REDIS_USERNAME: t.String(),
  REDIS_PASSWORD: t.String(),
});

export type Environment = Static<typeof EnvironmentDTO>;
