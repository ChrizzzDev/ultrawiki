import { fail, redirect } from "@sveltejs/kit";

import type { RequestEvent, Actions } from './$types';
import { authenticateUser, createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/api";
import { searchUser } from "db";

export const load = async(e: RequestEvent) => {
  if (e.locals.session !== null && e.locals.user !== null) {
    return redirect(302, '/');
  }

  return {};
}

export const actions: Actions = {
  google: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await authenticateUser(email, password);
    if (!user) {
      return fail(401, { message: 'Invalid credentials' });
    }

    const sessionToken = generateSessionToken();
    setSessionTokenCookie(event, sessionToken, new Date(Date.now() + 1000 * 60 * 60 * 24 * 30));

    return redirect(302, '/');
  },

  credentials: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await searchUser({ email });
    if (!user) return fail(401, { message: 'Invalid credentials' });

    const result = await authenticateUser(email, password);
    if (!result) return fail(401, { message: 'Invalid password' });

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);

    redirect(302, '/');
  }
}