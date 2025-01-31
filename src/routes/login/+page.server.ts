import { fail, redirect } from "@sveltejs/kit";

import type { RequestEvent, Actions } from './$types';
import { authenticateUser, generateSessionToken, setSessionTokenCookie } from "$lib/server/api";

export const load = async(e: RequestEvent) => {
  if (e.locals.session !== null && e.locals.user !== null) {
    return redirect(302, '/');
  }

  return {};
}

export const actions: Actions = {
  default: async (e) => {
    //@ts-expect-error
    const { email, password } = e.request.body;

    const user = await authenticateUser(email, password);
    if (!user) {
      return fail(401, { message: 'Invalid credentials' });
    }

    const sessionToken = generateSessionToken();
    setSessionTokenCookie(e, sessionToken, new Date(Date.now() + 1000 * 60 * 60 * 24 * 30));

    return redirect(302, '/');
  }
}