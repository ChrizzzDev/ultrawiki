import { Kysely, MysqlDialect,  } from 'kysely';
import { createPool} from 'mysql2';
import { DATABASE_URL } from '$env/static/private';
import type { DB } from 'dbt'

const dialect = new MysqlDialect({
  pool: createPool({
    uri: DATABASE_URL,
  })
});

const kysely = new Kysely<DB>({ dialect })

export async function searchUser(email: string) {
  return await kysely
    .selectFrom('User')
    .where('email', '=', email)
    .select(['email', 'password'])
    .executeTakeFirst();
}

export default kysely;