import type { User } from '@prisma/client';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

import AdminUserTable from '~/components/admin/AdminUserTable';
import { getAllUsers } from '~/utils/queries.server';

type LoaderData = {
  users: User[];
};

export const loader: LoaderFunction = async () => {
  const users = await getAllUsers();

  const data: LoaderData = {
    users,
  };

  return data;
};

export default function AdminUsers() {
  const data = useLoaderData<LoaderData>();
  return (
    <section className='p-10 h-screen'>
      <div>
        {data.users && data.users.length > 0 ? (
          <AdminUserTable users={data.users} />
        ) : (
          <div className='text-center'>
            <h1>
              Oh snap!!, there are no rooms created at this time. Please create
              one!
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}
