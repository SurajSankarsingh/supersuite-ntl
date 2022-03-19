import { withZod } from '@remix-validated-form/with-zod';
import { useEffect, useState } from 'react';
import {
  ActionFunction,
  json,
  LoaderFunction,
  useActionData,
  useLoaderData,
} from 'remix';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { z } from 'zod';
import { Input } from '~/components/Input';
import { updateUser, getUser } from '~/utils/session.server';
import { SubmitBtn } from '~/components/Submit';
import invariant from 'tiny-invariant';

type ActionData = {
  formError?: string;
};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  return {
    user,
  };
};

export const validateUpdateProfile = withZod(
  z.object({
    username: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .optional(),
    email: z.string().email('Invalid email address').optional(),
  })
);

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const result = await validateUpdateProfile.validate(await request.formData());
  const currentUser = await getUser(request);

  const currentUserId = currentUser?.id;

  if (result.error) {
    return validationError(result.error);
  }

  const { username, email } = result.data;

  invariant(username, 'Expected username');
  invariant(email, 'Expected email');

  const user = await updateUser({ username, email, currentUserId });

  if (!user) {
    return badRequest({
      formError: `Sorry, Something went wrong. Please try again`,
    });
  }

  return user;
};

export default function Profile() {
  const data = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const [user, setUser] = useState({ username: '', email: '' });

  const { username, email } = user;

  useEffect(() => {
    if (data.user) {
      setUser({
        username: data.user?.username,
        email: data.user?.email,
      });
    }
  }, [data.user]);

  const onChange = (e: { target: { name: any; value: any } }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='flex justify-center'>
        <ValidatedForm validator={validateUpdateProfile} method='post'>
          <Input
            name='username'
            label='Username'
            value={username}
            onChange={onChange}
          />

          <Input name='email' label='Email' value={email} onChange={onChange} />

          <SubmitBtn name='Edit' />

          <div id='form-error-message'>
            {actionData?.formError ? (
              <p className='text-xs text-red-600 mt-2' role='alert'>
                {actionData.formError}
              </p>
            ) : null}
          </div>
        </ValidatedForm>
      </div>
    </>
  );
}
