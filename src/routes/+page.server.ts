import { fail, redirect } from "@sveltejs/kit";
import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/api";

import type { Actions, RequestEvent } from "./$types";

export const actions: Actions = {
  default: async (e: RequestEvent) => {
    if (e.locals.session === null) {
      return fail(401);
    }

    invalidateSession(e.locals.session.id);
    deleteSessionTokenCookie(e);

    return redirect(302, '/login')
  }
}