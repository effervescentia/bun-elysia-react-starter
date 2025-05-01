import { cors } from '@elysiajs/cors';
import Elysia from 'elysia';

export type App = typeof App;
export const App = new Elysia().use(cors());
