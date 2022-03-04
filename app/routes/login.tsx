import type { ActionFunction } from 'remix';
import { useActionData, json, Link, useSearchParams } from 'remix';

import { createUserSession, login } from '~/utils/session.server';

function validateUseremail(email: unknown) {
  if (typeof email !== 'string' || !email.includes('@')) {
    return 'Email is not valid';
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 10) {
    return 'Password must be at least 10 characters long';
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
    password: string | undefined;
  };
  fields?: {
    email: string;
    password: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  const redirectTo = form.get('redirectTo') || '/';
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return badRequest({
      formError: `Form not submitted correctly`,
    });
  }

  const fields = { email, password };
  const fieldErrors = {
    email: validateUseremail(email),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
    });
  }

  const user = await login({ email, password });
  console.log(user);

  if (!user) {
    return badRequest({
      fields,
      formError: `Email or password is incorrect`,
    });
  }
  return createUserSession(user.id, user.role, redirectTo);
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  return (
    <div className='flex max-w-md mx-auto overflow-hidden bg-slate-200 rounded-lg shadow-lg dark:bg-slate-800'>
      <div className='w-full px-6 py-8 md:px-8'>
        <h2 className='text-2xl font-semibold text-center text-gray-700 dark:text-white'>
          SuperSuite
        </h2>

        <p className='text-xl text-center text-gray-600 dark:text-gray-200'>
          Welcome back!
        </p>

        <a
          href='#'
          className='flex items-center justify-center mt-4 text-gray-600 transition-colors duration-200 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
        >
          <div className='px-4 py-2'>
            <svg className='w-6 h-6' viewBox='0 0 40 40'>
              <path
                d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                fill='#FFC107'
              />
              <path
                d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
                fill='#FF3D00'
              />
              <path
                d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
                fill='#4CAF50'
              />
              <path
                d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                fill='#1976D2'
              />
            </svg>
          </div>

          <span className='w-5/6 px-4 py-3 font-bold text-center'>
            Sign in with Google
          </span>
        </a>

        <div className='flex items-center justify-between mt-4'>
          <span className='w-1/5 border-b dark:border-gray-600 lg:w-1/4'></span>

          <p className='text-xs text-center text-slate-400 uppercase dark:text-gray-40'>
            or login with email
          </p>

          <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
        </div>

        <form method='post'>
          <input
            type='hidden'
            name='redirectTo'
            value={searchParams.get('redirectTo') ?? undefined}
          />
          <div className='mt-4'>
            <label
              className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'
              htmlFor='user-email'
            >
              Email Address
            </label>
            <input
              id='email-email'
              className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300'
              type='email'
              name='email'
              required
              defaultValue={actionData?.fields?.email}
              aria-invalid={Boolean(actionData?.fieldErrors?.email)}
              aria-errormessage={
                actionData?.fieldErrors?.email ? 'email-error' : undefined
              }
            />
            {actionData?.fieldErrors?.email ? (
              <p
                className='text-xs text-red-600 mt-2'
                role='alert'
                id='email-error'
              >
                {actionData.fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div className='mt-4'>
            <div className='flex justify-between'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'
                htmlFor='user-password'
              >
                Password
              </label>
              <a
                href='#'
                className='text-xs text-gray-500 dark:text-gray-300 hover:underline'
              >
                Forgot Password?
              </a>
            </div>

            <input
              id='password'
              className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300'
              type='password'
              name='password'
              required
              defaultValue={actionData?.fields?.password}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.password) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.password ? 'password-error' : undefined
              }
            />
            {actionData?.fieldErrors?.password ? (
              <p
                className='text-xs text-red-600 mt-2'
                role='alert'
                id='password-error'
              >
                {actionData.fieldErrors.password}
              </p>
            ) : null}
          </div>
          <div id='form-error-message'>
            {actionData?.formError ? (
              <p className='text-xs text-red-600 mt-2' role='alert'>
                {actionData.formError}
              </p>
            ) : null}
          </div>

          <div className='mt-8'>
            <button
              type='submit'
              className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            >
              Login
            </button>
          </div>
        </form>

        <div className='flex items-center justify-between mt-4'>
          <span className='w-1/5 border-b dark:border-gray-600 md:w-1/4'></span>

          <Link
            to='/register'
            className='text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline'
          >
            or sign up
          </Link>

          <span className='w-1/5 border-b dark:border-gray-600 md:w-1/4'></span>
        </div>
        <Link to='/' className='text-xs btn btn-accent btn-outline mt-4'>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
