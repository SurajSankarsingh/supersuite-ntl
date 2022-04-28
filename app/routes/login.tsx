import { json } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { useActionData, Link, useSearchParams } from '@remix-run/react';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { withZod } from '@remix-validated-form/with-zod';
import { SubmitBtn } from '~/components/Submit';
import { Input } from '~/components/Input';
import { z } from 'zod';
import { createUserSession, login } from '~/utils/session.server';
import { GoogleBtn } from '~/components/GoogleBtn';

type ActionData = {
  formError?: string;
};

export const validateLogin = withZod(
  z.object({
    email: z
      .string()
      .nonempty('Email is required')
      .email('Invalid email address'),
    password: z
      .string()
      .nonempty('Password is required')
      .min(10, 'Password must be at least 10 characters'),
    redirectTo: z.string(),
  })
);

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const result = await validateLogin.validate(await request.formData());

  if (result.error) {
    return validationError(result.error);
  }

  const { email, password, redirectTo } = result.data;

  const user = await login({ email, password });

  if (!user) {
    return badRequest({
      formError: `Email or password is incorrect`,
    });
  }
  return createUserSession(user.id, user.role, redirectTo);
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  return (
    <div className='h-screen'>
      <div className='flex max-w-md mx-auto overflow-hidden bg-slate-200 rounded-lg shadow-lg dark:bg-slate-800'>
        <div className='w-full px-6 py-8 md:px-8'>
          <h2 className='text-2xl font-semibold text-center text-slate-700 dark:text-slate-100'>
            SuperSuite
          </h2>

          <p className='text-xl text-center text-slate-600 dark:text-slate-200'>
            Welcome back!
          </p>

          <GoogleBtn name='Sign in with Google' />

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b border-slate-700 dark:border-slate-600 lg:w-1/4'></span>

            <p className='text-xs text-center text-slate-400 uppercase dark:text-gray-40'>
              or login with email
            </p>

            <span className='w-1/5 border-b border-slate-700 dark:border-slate-600 lg:w-1/4'></span>
          </div>

          <ValidatedForm validator={validateLogin} method='post'>
            <input
              type='hidden'
              name='redirectTo'
              value={searchParams.get('redirectTo') ?? undefined}
            />
            <Input name='email' label='Email' required />

            <Input name='password' label='Password' type='password' required />
            <a
              href='#'
              className='text-xs text-slate-500 dark:text-slate-300 hover:underline'
            >
              Forgot Password?
            </a>

            <SubmitBtn name='Login' />
            <div id='form-error-message'>
              {actionData?.formError ? (
                <p className='text-xs text-red-600 mt-2' role='alert'>
                  {actionData.formError}
                </p>
              ) : null}
            </div>
          </ValidatedForm>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b border-slate-700 dark:border-slate-600 md:w-1/4'></span>

            <Link
              to='/register'
              className='text-xs text-slate-500 uppercase dark:text-slate-400 hover:underline'
            >
              or sign up
            </Link>

            <span className='w-1/5 border-b border-slate-700 dark:border-slate-600 md:w-1/4'></span>
          </div>
          <Link to='/' className='text-xs btn btn-primary btn-outline mt-4'>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
