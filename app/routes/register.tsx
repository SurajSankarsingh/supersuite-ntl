import { withZod } from '@remix-validated-form/with-zod';
import { Link, useActionData, useSearchParams } from '@remix-run/react';
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { z } from 'zod';
import { GoogleBtn } from '~/components/GoogleBtn';
import { Input } from '~/components/Input';
import { SubmitBtn } from '~/components/Submit';
import { createUserSession, register } from '~/utils/session.server';

type ActionData = {
  formError?: string;
};

export const validateRegister = withZod(
  z
    .object({
      username: z
        .string()
        .nonempty('Name is required')
        .min(3, 'Name must be at least 3 characters long'),
      email: z
        .string()
        .nonempty('Email is required')
        .email('Invalid email address'),
      password: z
        .string()
        .nonempty('Password is required')
        .min(10, 'Password must be at least 10 characters'),
      confirmPassword: z.string(),
      redirectTo: z.string(),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })
);

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const result = await validateRegister.validate(await request.formData());

  if (result.error) {
    return validationError(result.error);
  }

  const { username, email, password, redirectTo } = result.data;

  const user = await register({ username, email, password });

  if (!user) {
    return badRequest({
      formError: `Sorry, Something went wrong. Please try again`,
    });
  }

  return createUserSession(user.id, user.role, redirectTo);
};

export default function Register() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  return (
    <div className='flex max-w-md mx-auto overflow-hidden bg-slate-200 rounded-lg shadow-lg dark:bg-slate-800'>
      <div className='w-full px-6 py-8 md:px-8'>
        <h2 className='text-2xl font-semibold text-center text-gray-700 dark:text-white'>
          SuperSuite
        </h2>

        <p className='text-xl text-center text-gray-600 dark:text-gray-200'>
          Register an account
        </p>

        <GoogleBtn name='Sign up with Google' />

        <div className='flex items-center justify-between mt-4'>
          <span className='w-1/5 border-b dark:border-gray-600 lg:w-1/4'></span>

          <p className='text-xs text-center text-slate-400 uppercase dark:text-gray-40'>
            or create an account
          </p>

          <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
        </div>

        <ValidatedForm validator={validateRegister} method='post'>
          <input
            type='hidden'
            name='redirectTo'
            value={searchParams.get('redirectTo') ?? undefined}
          />
          <Input name='username' label='Username' required />

          <Input name='email' label='Email' required />

          <Input name='password' label='Password' type='password' required />

          <Input
            name='confirmPassword'
            label='Confirm password'
            type='password'
            required
          />

          <SubmitBtn name='Register' />
          <div id='form-error-message'>
            {actionData?.formError ? (
              <p className='text-xs text-red-600 mt-2' role='alert'>
                {actionData.formError}
              </p>
            ) : null}
          </div>
        </ValidatedForm>

        <div className='flex items-center justify-between mt-4'>
          <span className='w-1/5 border-b dark:border-gray-600 md:w-1/4'></span>

          <Link
            to='/login'
            className='text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline'
          >
            or sign in
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
