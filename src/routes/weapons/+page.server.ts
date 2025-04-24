import kysely from 'db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const weapons = await kysely.selectFrom('Weapon').select(['WeaponId', 'Name']).execute();
	return { weapons };
};
