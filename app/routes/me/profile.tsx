import { LoaderFunction, Outlet, useLoaderData } from 'remix';
import { getUser } from '~/utils/session.server';

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  return {
    user,
  };
};

export default function ProfileRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className='flex flex-col justify-center h-screen lg:flex-row lg:justify-evenly'>
      <div className='flex flex-col'>
        <div>Current User Details:</div>
        <h2>Username: {data.user?.username}</h2>
        <h2>Email: {data.user?.email}</h2>
      </div>
      <Outlet />
    </div>
  );
}
