import type { User } from '@prisma/client';
import { Form, Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import AdminUserDetails from '~/components/admin/AdminUserDetails';
import { deleteUser } from '~/utils/mutations.server';
import { getUserById } from '~/utils/queries.server';

type LoaderData = {
  user: User;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { userId } = params;

  invariant(userId, 'Expected userId');

  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');

  const data: LoaderData = { user };

  return data;
};

export const action: ActionFunction = async ({ params }) => {
  const { userId } = params;
  invariant(userId, 'Expected userId');

  await deleteUser(userId);

  return redirect('/admin/users');
};

export default function AdminUser() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <AdminUserDetails user={data.user} />
      <div className='flex flex-row justify-center'>
        <Link to='/admin/users' className='btn btn-outline btn-accent mr-4'>
          Back to Users Table
        </Link>
        <Form method='post'>
          <button type='submit' className='btn btn-outline btn-error'>
            Delete User
          </button>
        </Form>
      </div>
    </>
  );
}
