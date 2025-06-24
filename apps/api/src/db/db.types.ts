import type { PgQueryResultHKT, PgTransaction } from 'drizzle-orm/pg-core';

// biome-ignore lint/suspicious/noExplicitAny: any is fine here
export type Transaction = PgTransaction<PgQueryResultHKT, any, any>;
