import { Outlet, useCatch } from '@remix-run/react';
import { requireAdmin } from '~/utils/session.server';
import type { LoaderFunction } from '@remix-run/node';

type LoaderData = {
  userId: Awaited<ReturnType<typeof requireAdmin>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireAdmin(request);

  const data: LoaderData = { userId };

  return data;
};

export default function AdminRoute() {
  return (
    <>
      <h1 className='flex justify-center'>
        This page can only be seen by ADMIN users. You rock!!
      </h1>
      <Outlet />
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 401) {
    return (
      <>
        <h1 className='flex justify-center text-xl font-semibold h-screen'>
          Oh No!! It looks like you need to level up to view this page!!
        </h1>
      </>
    );
  }
}
