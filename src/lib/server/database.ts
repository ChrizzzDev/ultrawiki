import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { DATABASE_URL } from '$env/static/private';
import type { DB } from 'dbt';

const dialect = new MysqlDialect({
  pool: createPool({
    uri: "mysql://local_pc:T3$3SJtGmmf@40.233.17.145:3306/ultrawiki"
  })
})

const kysely = new Kysely<DB>({
  dialect
});

export default kysely;