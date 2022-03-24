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
    <div className='flex flex-col justify-center h-screen lg:flex-row lg:justify-evenly lg:mt-16'>
      <div className='flex flex-col text-center mb-6'>
        <div className='text-xl font-semibold mb-8'>Current User Details:</div>
        <h2 className='my-4 text-lg italic'>
          Username:
          <span className='ml-4 text-cyan-600'>{data.user?.username}</span>
        </h2>
        <h2 className='my-4 text-lg italic'>
          Email: <span className='ml-4 text-cyan-600'>{data.user?.email}</span>
        </h2>
      </div>
      <Outlet />
    </div>
  );
}
