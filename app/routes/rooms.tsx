import { LoaderFunction, Outlet, useLoaderData } from 'remix';
import Auth from '~/components/Auth';
import { getUser } from '~/utils/session.server';

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  const data: LoaderData = {
    user,
  };

  return data;
};

export default function Rooms() {
  const data = useLoaderData<LoaderData>();
  return (
    <>
      <div className='flex flex-row justify-end items-center p-6'>
        <Auth user={data.user} />
      </div>
      <Outlet />
    </>
  );
}
