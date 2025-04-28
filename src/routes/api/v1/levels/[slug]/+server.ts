import { error, json } from '@sveltejs/kit';
import db from 'db';

import type { LevelResponse } from '$lib';
import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
	runtime: 'edge'
};

export async function GET({ params, url }) {
	const { slug } = params;
	const searchParams = url.searchParams;

	// --- Read filters ---
	const fieldsParam = searchParams.get('fields');
	const enemiesParam = searchParams.has('enemies');

	// --- Define valid fields ---
	const validFields = ['LevelId', 'Name', 'Act', 'Secret', 'PRank', 'Challenge'] as const;
	const normalizedFields = validFields.map((f) => f.toLowerCase());

	// --- Process selected fields ---
	const selectedFields = fieldsParam
		? fieldsParam
				.split(',')
				.map((field) => field.trim().toLowerCase())
				.filter((field) => normalizedFields.includes(field))
				.map((field) => validFields[normalizedFields.indexOf(field)])
		: [...validFields];

	if (selectedFields.length === 0) {
		throw error(400, 'No valid fields selected.');
	}

	try {
		// --- Query to fetch the level based on slug ---
		const query = db
			.selectFrom('Level')
			.select(selectedFields.map((f) => `Level.${f}` as const))
			.$if(enemiesParam, (qb) =>
				qb
					.leftJoin('LevelEnemy', 'LevelEnemy.LevelId', 'Level.LevelId')
					.select(['LevelEnemy.EnemyId as EnemyId', 'LevelEnemy.Quantity as Quantity'])
			)
			.where((eb) =>
				eb.or([eb('Level.LevelId', '=', slug), eb('Level.Name', '=', slug.replaceAll('_', ' '))])
			); // Filter by the slug

		const rows = await query.execute();

		// If no level found with the slug, throw a 404 error
		if (rows.length === 0) {
			return error(404, 'Level not found');
		}

		// --- Transform results ---
		const result: Record<string, LevelResponse> = {};

		for (const row of rows) {
      if (!result[row.LevelId]) {
        result[row.LevelId] = {
          LevelId: row.LevelId,
          Name: row.Name,
          Act: row.Act,
          Challenge: row.Challenge ?? undefined,
        };
  
        for (const field of selectedFields) {
          result[row.LevelId][field as string] = row[field];
        }
  
        if (enemiesParam) {
          result[row.LevelId].Enemies = [];
        }
      }
  
      if (row.PRank) {
        try {
          result[row.LevelId].PRank = JSON.parse(row.PRank)
        } catch (err) {
          console.error('Error parsing PRank: ', err);
        }
      }
  
      if (row.Secret) {
        try {
          result[row.LevelId].Secret = JSON.parse(row.Secret)
        } catch (err) {
          console.error('Error parsing Secret: ', err);
        }
      }
  
      // Handle enemies if requested
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
			if (level.Enemies && level.Enemies.length === 0) {
				// biome-ignore lint/performance/noDelete: guevo
				delete level.Enemies;
			}
		}

		return json(finalResult);
	} catch (e) {
		console.error(e);
		// Handle unexpected errors
		throw error(500, 'Internal Server Error');
	}
}