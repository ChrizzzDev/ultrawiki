import cuid from '$lib/cuid.js';
import { createSession, createUser, generateSessionToken, setSessionTokenCookie, validateSessionToken } from '$lib/server/api.js';
import { fail, redirect } from '@sveltejs/kit';
import kysely, { searchUser } from 'db';

const token = generateSessionToken();
export const actions = {
  register: async (event) => {
    const formData = await event.request.formData();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('repeat_password') as string;

    if (!email || !password || password !== confirmPassword) return fail(400, { message: 'Invalid fields' });

    let user = undefined;
    if (await searchUser({ email })) return fail(400, { message: 'User already exists' });

    await kysely
      .insertInto('User')
      .values({
        email,
        id: cuid(),
        name: ''
      })
      .executeTakeFirst();

    user = await searchUser({ email });

    const session = await createSession(token, user!.id);
    setSessionTokenCookie(event, token, session.expiresAt);

    return { ok: true }
  },

  setUsername: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get('username') as string;

    const session = await validateSessionToken(token)
    if (!session) return fail(401, { error: 'Unauthorized' });
    
    const existingUser = await searchUser({ username });
    if (existingUser) return fail(400, { error: 'Username is taken' });

    await kysely
      .updateTable('User')
      .set({ name: username })
      .execute();

    redirect(303, '/');
  }
}