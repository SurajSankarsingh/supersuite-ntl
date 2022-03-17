import { Outlet, useCatch } from 'remix';
import { requireAdmin } from '~/utils/session.server';
import { LoaderFunction } from 'remix';

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
      <h1>Admin</h1>
      <Outlet />
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 401) {
    return (
      <>
        <h1>Oh No!! It looks like you need to level up to view this page!!</h1>
      </>
    );
  }
}
