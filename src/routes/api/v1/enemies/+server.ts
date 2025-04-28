// import { error, json } from '@sveltejs/kit';
// import db from 'db';
// import { Enemy_Category, Enemy_Race } from 'dbt';

// import type { EnemyResponse } from '$lib';
// import type { Config } from '@sveltejs/adapter-vercel';

// export const config: Config = {
// 	runtime: 'edge'
// };

// export async function GET({ url }) {
// 	const searchParams = url.searchParams;

// 	// --- Read filters ---
// 	const fieldsParam = searchParams.get('fields');
// 	const raceParam = searchParams.get('race');
//   const categoryParam = searchParams.get('category');
//   const limitParam = searchParams.get('limit');
//   const pageParam = searchParams.get('page');
//   const debutParam = searchParams.has('debut');

//   const limit = limitParam ? Number(limitParam) : undefined;
//   const page = pageParam ? Number(pageParam) : 1;

//   // --- Basic validations ---
//   if (limit !== undefined && (Number.isNaN(limit) || limit <= 0 || limit > 100)) {
//     throw error(400, 'Invalid limit. Must be between 1 and 100.');
//   }

//   if (Number.isNaN(page) || page <= 0) {
//     throw error(400, 'Invalid page. Must be 1 or higher.');
//   }

//   const offset = limit !== undefined ? (page - 1) * limit : undefined;

// 	// --- Define valid fields ---
// 	const validFields = ['Name', 'Category', 'Race', 'Weigth', 'Health', 'Attacks', 'DamageModifiers', 'DebutId', 'SPR', 'FallDamage'] as const;
//   const normalizedFields = validFields.map(f => f.toLowerCase());

//   const normalizedRaces = Object.keys(Enemy_Race).map(f => f.toLowerCase());

//   const normalizedCategories = Object.keys(Enemy_Category).map(f => f.toLowerCase());

//   // --- Validate race and category ---
//   if (raceParam && !normalizedRaces.includes(raceParam.toLowerCase())) {
//     throw error(400, 'Invalid race.');
//   }

//   if (categoryParam && !normalizedCategories.includes(categoryParam.toLowerCase())) {
//     throw error(400, 'Invalid category.');
//   }

//   // --- Process selected fields ---
//   const selectedFields = fieldsParam
//     ? fieldsParam
//       .split(',')
//       .map(f => f.trim().toLowerCase())
//       .filter(f => normalizedFields.includes(f))
//       .map(f => validFields[normalizedFields.indexOf(f)])
//     : [...validFields];

//   if (selectedFields.length === 0) {
//     throw error(400, 'No valid fields selected.');
//   }

//   // --- Process race and category ---
//   const race = raceParam? Enemy_Race[raceParam as keyof typeof Enemy_Race]: undefined;

//   const category = categoryParam? Enemy_Category[categoryParam as keyof typeof Enemy_Category]: undefined;

//   try {
//     // --- Build base query ---
//     const query = db
//       .selectFrom('Enemy')
//       .select(selectedFields.map(f => `Enemy.${f}` as const))
//       .$if(debutParam, qb =>
//         qb
//           .leftJoin('Level', 'Level.LevelId', 'Enemy.DebutId')
//           .select(['Level.LevelId as DebutId', 'Level.Name as DebutName'])
//       )
//      .$if(race !== undefined, qb =>
//         qb
//          .where('Enemy.Race', '=', race!)
//       )
//     .$if(category!== undefined, qb =>
//         qb
//         .where('Enemy.Category', '=', category!)
//       )
//     .$if(limit !== undefined, qb => qb.limit(limit!).offset(offset!));

//     const rows = await query.execute();

//     // --- Transform results ---
//     const result: Record<string, EnemyResponse> = {};

//     for (const row of rows) {
//       if (!result[row.Name]) {
//         result[row.Name] = {
//           Name: row.Name,
//           Race: row.Race,
//           Weigth: row.Weigth,
//           Health: row.Health,
//           Attacks: row.Attacks,
//         }
//       }
//     }
//   } catch (err) {

//   }
// }

// TODO: this wole shit