import bcrypt from 'bcryptjs';
import { createCookieSessionStorage, redirect } from 'remix';

import { db } from './db.server';

type LoginForm = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginForm) {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) return null;

  return { id: user.id, username: user.username, email };
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('No SESSION_SECRET in environment');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'SupperSuite_session',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 2, //  2 days
    secrets: [sessionSecret],
    path: '/',
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}
