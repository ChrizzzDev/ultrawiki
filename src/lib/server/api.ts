import type { User, Session } from "dbt";
import kysely from "db";
import { 
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import type { RequestEvent } from "@sveltejs/kit";
import { init } from "@paralleldrive/cuid2";
import bcrypt from 'bcryptjs';

const cuid = (length: number = 5) => init({ length })();

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);

  return token;
}

export async function createSession(token: string, userId: string): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  };

  await kysely
    .insertInto('Session')
    .values({
      id: session.id,
      userId: session.userId,
      expiresAt: new Date(session.expiresAt)
    })
    .execute();

  return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await kysely
    .selectFrom('Session')
    .where('Session.id', '=', sessionId)
    .innerJoin('User', 'User.id', 'Session.userId')
    .selectAll(['Session', 'User'])
    .executeTakeFirst();

  if (!result || Date.now() >= result.expiresAt.getTime()) {
    if (result) await kysely.deleteFrom('Session').where('id', '=', sessionId).execute();
    return { session: null, user: null };
  }

  if (Date.now() >= result.expiresAt.getTime() + 1000 * 60 * 60 * 24 * 15) {
    await kysely.updateTable('Session').set({ expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }).execute();
  }

  return {
    user: {
      id: result.userId,
      googleId: result.googleId,
      email: result.email,
      emailVerified: result.emailVerified,
      image: result.image,
      name: result.name,
      password: result.password
    },
    session: {
      expiresAt: result.expiresAt,
      id: result.id,
      userId: result.userId
    }
  };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await kysely.deleteFrom('Session').where('Session.id', '=', sessionId).execute();
}

export async function invalidateUserSessions(userId: string) {
  await kysely
    .deleteFrom('Session')
    .where('userId', '=', userId)
    .execute();
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
  event.cookies.set('session', token, {
    httpOnly: true,
    path: '/',
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    expires: expiresAt
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.set('session', '', {
    httpOnly: true,
    path: '/',
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: 0
  });
}

export async function createUser(googleId: string, email: string, name: string, picture: string) {
  await kysely
    .insertInto('User')
    .values({
      id: cuid(),
      email,
      name,
      image: picture,
      googleId
    })
    .execute();

  const result = await kysely.selectFrom('User').where('googleId', '=', googleId).selectAll().executeTakeFirst();

  return result;
}

export async function getUserFromGoogleId(googleId: string): Promise<User | null> {
  const result = await kysely
    .selectFrom('User')
    .where('id', '=', googleId)
    .selectAll()
    .executeTakeFirst();

  if (!result) return null;
  return result;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await kysely
    .selectFrom('User')
    .where('email', '=', email)
    .selectAll()
    .executeTakeFirst();

  if (user && (await bcrypt.compare(password, user.password!))) {
    return user;
  }
  
  return null;
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };