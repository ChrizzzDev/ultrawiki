import { error, json } from '@sveltejs/kit';
import db from 'db';
import { sql } from 'kysely';

import type { LevelResponse } from '$lib';
import type { Config } from '@sveltejs/adapter-vercel';

export async function GET({ url }) {
	const searchParams = url.searchParams;

	// --- Read filters ---
	const actParam = searchParams.get('act');
	const layerParam = searchParams.get('layer');
	const fieldsParam = searchParams.get('fields');
  const limitParam = searchParams.get('limit');
  const pageParam = searchParams.get('page');
	const enemiesParam = searchParams.has('enemies');

  const limit = limitParam ? Number(limitParam) : undefined;
  const page = pageParam ? Number(pageParam) : 1;

  // --- Basic validations ---
  if (limit !== undefined && (Number.isNaN(limit) || limit <= 0 || limit > 100)) {
    throw error(400, 'Invalid limit. Must be between 1 and 100.');
  }

  if (Number.isNaN(page) || page <= 0) {
    throw error(400, 'Invalid page. Must be 1 or higher.');
  }

  const offset = limit !== undefined ? (page - 1) * limit : undefined;

	// --- Define valid fields ---
	const validFields = ['LevelId', 'Name', 'Act', 'Secret', 'PRank', 'Challenge'] as const;
	const normalizedFields = validFields.map((f) => f.toLowerCase());

	// --- Process selected fields ---
	const selectedFields = fieldsParam
		? fieldsParam
				.split(',')
				.map(f => f.trim().toLowerCase())
				.filter(f => normalizedFields.includes(f))
				.map(f => validFields[normalizedFields.indexOf(f)])
		: [...validFields];

	if (selectedFields.length === 0) {
		throw error(400, 'No valid fields selected.');
	}

	// --- Normalized act names ---
	const actsMap = {
		OVERTURE: 'OVERTURE: THE MOUTH OF HELL',
		'ACT I': 'ACT I: INFINITE HYPERDEATH',
		'ACT II': 'ACT II: IMPERFECT HATRED',
		'ACT III': 'ACT III: GODFIST SUICIDE'
	} as const;

	let actFilter: valueof<typeof actsMap>;
	if (actParam) {
		const normalizedAct = actParam
			.toUpperCase()
			.replace('1', 'I')
			.replace('2', 'II')
			.replace('3', 'III');
		actFilter = actsMap[normalizedAct as keyof typeof actsMap];
		if (!actFilter) {
			throw error(400, 'Invalid act provided.');
		}
	}

	try {
		// --- Build base query ---
		const query = db
			.selectFrom('Level')
			.select(selectedFields.map((f) => `Level.${f}` as const))
			.$if(enemiesParam, (qb) =>
				qb
					.leftJoin('LevelEnemy', 'LevelEnemy.LevelId', 'Level.LevelId')
					.select(['LevelEnemy.EnemyId as EnemyId', 'LevelEnemy.Quantity as Quantity'])
			)
			.$if(Boolean(actFilter!), (qb) => qb.where('Level.Act', '=', actFilter))
			.$if(Boolean(layerParam), (qb) =>
				qb.where(
					({ ref, eb }) =>
						eb(sql`CAST(SUBSTRING_INDEX(${ref('Level.LevelId')}, '-', 1) AS UNSIGNED)`, '=', Number(layerParam)),
				)
			)
      .$if(limit !== undefined, qb => qb.limit(limit!).offset(offset!));

		const rows = await query.execute();

		// --- Transform results ---
		const result: Record<string, LevelResponse> = {};

		for (const row of rows) {
			if (!result[row.LevelId]) {
				result[row.LevelId] = {
					LevelId: row.LevelId,
					Name: row.Name,
					Act: row.Act,
					Challenge: row.Challenge ?? undefined
				};

				for (const field of selectedFields) {
					result[row.LevelId][field as string] = row[field];
				}

				if (enemiesParam) {
					result[row.LevelId].Enemies = [];
				}
			}

			if (enemiesParam && row.EnemyId && row.Quantity != null) {
				result[row.LevelId].Enemies?.push({
					EnemyId: row.EnemyId,
					Quantity: row.Quantity
				});
			}
		}

		const finalResult = Object.values(result);

		// If enemies is empty, remove it
		for (const level of finalResult) {
			if (level.Enemies && Object.keys(level.Enemies).length === 0) {
				// biome-ignore lint/performance/noDelete: oye no nada
				delete level.Enemies;
			}
		}

		return json(finalResult);
	} catch (e) {
		console.error(e);
		throw error(500, 'Internal Server Error');
	}
}

type valueof<T> = T[keyof T];