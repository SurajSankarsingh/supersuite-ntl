import type { Room } from '@prisma/client';
import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

import AdminRoomTable from '~/components/admin/AdminRoomTable';
import { getAllRooms } from '~/utils/queries.server';

type LoaderData = {
  rooms: Room[];
};

export const loader: LoaderFunction = async () => {
  const rooms = await getAllRooms();

  return { rooms };
};

export default function AdminRooms() {
  const data = useLoaderData<LoaderData>();

  return (
    <section className='p-10 h-screen'>
      <Link to='/admin/rooms/new' className='btn btn-outline btn-primary mb-4'>
        Create Room
      </Link>
      <div>
        {data.rooms && data.rooms.length > 0 ? (
          <AdminRoomTable rooms={data.rooms} />
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
