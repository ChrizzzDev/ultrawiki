import kysely from 'db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug.replaceAll('_', ' ');

	const data = await kysely
		.selectFrom('Level')
		.leftJoin('LevelEnemy as LE', 'LE.LevelId', 'Level.LevelId')
		.select([
			'Level.Act as Act',
			'Level.Challenge as Challenge',
			'Level.LevelId as LevelId',
			'Level.Name as Name',
			'Level.PRank as PRank',
			'Level.Secret as Secrets',
			'LE.EnemyId as EnemyId',
			'LE.Quantity as Quantity',
		])
		.where(
			(eb) => eb.or([
				eb('Level.LevelId', '=', slug),
				eb('Level.Name', '=', slug)
			])
		)
		.execute();

	return { data };
};
