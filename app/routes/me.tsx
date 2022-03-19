import { LoaderFunction, Outlet } from 'remix';
import { useCatch } from 'remix';
import { requireUserId } from '~/utils/session.server';

type LoaderData = {
  userId: Awaited<ReturnType<typeof requireUserId>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const data: LoaderData = { userId };
  return data;
};

export default function Me() {
  return (
    <>
      <h1>User Pages</h1>
      <Outlet />
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 401) {
    return (
      <>
        <h1>Oh No!! It looks like you need to login to view this page!!</h1>
      </>
    );
  }
}