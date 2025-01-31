import kysely from 'db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const levels = kysely.selectFrom('Level').selectAll().execute()
	return {levels};
};