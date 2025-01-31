import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import Google from '@auth/sveltekit/providers/google';
import { KyselyAdapter } from '@auth/kysely-adapter';
import kysely from '$lib/server/database';
import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import { searchUser } from '$lib/server/database';
import { AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    Google({
      clientId: AUTH_GOOGLE_ID,
      clientSecret: AUTH_GOOGLE_SECRET
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password', minLength: 8, maxLength: 32, required: true },
        email: { label: 'Email', type: 'email', minlength: 1, required: true  }
      },
      type: 'credentials',
      authorize: async (credentials) => {
        let user = await searchUser(credentials.email as string);

        if (user && (await compare(credentials.password as string, user.password))) {
          return user;
        }

        return null;
      }
    })
  ],
  //@ts-expect-error
  adapter: KyselyAdapter(kysely),
  secret: AUTH_SECRET,
  session: {
    strategy: 'database'
  }
})