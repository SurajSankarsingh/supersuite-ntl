import type { ActionFunction } from '@remix-run/node';
import { withZod } from '@remix-validated-form/with-zod';
import { json } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { z } from 'zod';
import { Input } from '~/components/Input';
import { updateUser, getUser } from '~/utils/session.server';
import { SubmitBtn } from '~/components/Submit';

type ActionData = {
  formError?: string;
};

export const validateUpdateProfile = withZod(
  z.object({
    username: z.optional(
      z.string().min(3, 'Name must be at least 3 characters long')
    ),
    email: z.optional(z.string().email('Invalid email address')),
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

  const user = await updateUser({ username, email, currentUserId });

  if (!user) {
    return badRequest({
      formError: `Sorry, Something went wrong. Please try again`,
    });
  }

  return user;
};

export default function Profile() {
  const actionData = useActionData<ActionData>();

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col'>
        <ValidatedForm
          validator={validateUpdateProfile}
          method='post'
          resetAfterSubmit
        >
          <Input name='username' label='Username' />

          <SubmitBtn name='Change Username' />

          <div id='form-error-message'>
            {actionData?.formError ? (
              <p className='text-xs text-red-600 mt-2' role='alert'>
                {actionData.formError}
              </p>
            ) : null}
          </div>
        </ValidatedForm>

        <ValidatedForm
          validator={validateUpdateProfile}
          method='post'
          resetAfterSubmit
        >
          <Input name='email' label='Email' />

          <SubmitBtn name='Change Email' />

          <div id='form-error-message'>
            {actionData?.formError ? (
              <p className='text-xs text-red-600 mt-2' role='alert'>
                {actionData.formError}
              </p>
            ) : null}
          </div>
        </ValidatedForm>
      </div>
    </div>
  );
}
