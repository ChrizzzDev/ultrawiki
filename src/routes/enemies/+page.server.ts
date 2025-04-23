import kysely from "db";

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const enemies = await kysely.selectFrom('Enemy')
		.selectAll()
		.execute();

	return { enemies };
};