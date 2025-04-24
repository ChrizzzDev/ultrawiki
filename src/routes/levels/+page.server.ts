import kysely from 'db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const levels = await kysely.selectFrom('Level').select(['LevelId', 'Act', 'Name']).execute();
	return { levels };
};
