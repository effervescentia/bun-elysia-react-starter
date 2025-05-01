import type { App } from '@app/api';
import { treaty } from '@elysiajs/eden';

export const client = treaty<App>('localhost:3000');
