import { EnvironmentPlugin } from '@api/global/environment.plugin';
import { cors } from '@elysiajs/cors';
import Elysia from 'elysia';

import { LoggerPlugin } from '../global/logger.plugin';

export type App = typeof App;

export const App = new Elysia().use(cors()).use(EnvironmentPlugin).use(LoggerPlugin);
