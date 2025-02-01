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

// export async function searchUser({ email }: { email: string; username?: string })
export async function searchUser({ email, username }: { email?: string; username?: string; }) {
  return await kysely
    .selectFrom('User')
    .where((eb) => eb.or([
      eb('email', '=', email!),
      eb('name', '=', username!)
    ]))
    .selectAll()
    .executeTakeFirst();
}

export default kysely;