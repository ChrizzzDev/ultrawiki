import { error } from '@sveltejs/kit';
import kysely from 'db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  // const data = await kysely
  //   .selectFrom('Enemy')
  //   .selectAll()
  //   .where('Name', '=', params.slug.replaceAll('_', ' '))
  //   .executeTakeFirstOrThrow(() => {
  //     return error(404, 'Not Found');
  //   });

  // return  {...data };
}