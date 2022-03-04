import RoomCardItem from '~/components/RoomCardItem';
import { Link, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { db } from '~/utils/db.server';
import { Room } from '@prisma/client';
import Auth from '~/components/Auth';
import { getUser } from '~/utils/session.server';

type LoaderData = {
  rooms: Room[];
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  const data: LoaderData = {
    rooms: await db.room.findMany({
      where: {
        featured: true,
      },
    }),
    user,
  };

  return data;
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <section className='body-font container mx-auto'>
        <div className='flex flex-row justify-between p-6'>
          <Link to='/rooms' className='btn btn-outline btn-accent'>
            All Rooms
          </Link>
          <div className='flex flex-row justify-end items-center'>
            <Auth user={data.user} />
          </div>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-6'>
          {data.rooms.map((room) => (
            <RoomCardItem room={room} key={room.id} />
          ))}
        </div>
      </section>
    </>
  );
}
