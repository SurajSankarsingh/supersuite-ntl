import bcrypt from 'bcryptjs';
import { createCookieSessionStorage, redirect } from 'remix';

import { db } from './db.server';

type LoginForm = {
  email: string;
  password: string;
};

type RegisterForm = {
  username: string;
  email: string;
  password: string;
};

type UserProfile = {
  username: string | undefined;
  email: string | undefined;
  currentUserId: string | undefined;
};

export async function register({ username, email, password }: RegisterForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      username,
      email,
      password: {
        create: {
          hash: passwordHash,
        },
      },
    },
  });

  return { id: user.id, username, email, role: user.role };
}

export async function updateUser({
  username,
  email,
  currentUserId,
}: UserProfile) {
  const user = await db.user.update({
    where: { id: currentUserId },
    data: {
      email,
      username,
    },
  });

  return { id: user.id, username, email };
}

export async function login({ email, password }: LoginForm) {
  const userWithPassword = await db.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('No SESSION_SECRET in environment');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'SuperSuite_session',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 2, //  2 days
    secrets: [sessionSecret],
    path: '/',
  },
});

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') return null;
  return userId;
}

//Require user to be logged in
export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

//Require user to be logged in and have admin role
export async function requireAdmin(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  const role = session.get('role');
  if (!userId || typeof userId !== 'string' || role !== 'ADMIN') {
    throw new Response('You are not authorized', { status: 401 });
  }
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== 'string') {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true, role: true },
    });
    return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export async function createUserSession(
  userId: string,
  role: string,
  redirectTo: string
) {
  const session = await storage.getSession();
  session.set('userId', userId);
  session.set('role', role);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}
