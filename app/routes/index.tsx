import RoomCardItem from '~/components/RoomCardItem';
import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { getFeaturedRooms } from '~/utils/queries.server';
import type { Review, Room } from '@prisma/client';
import { motion } from 'framer-motion';
import { motionCardContainer } from '~/framer';

type LoaderData = {
  rooms: (Room & { reviews: Review[] })[];
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    rooms: await getFeaturedRooms(),
  };

  return data;
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <section className='body-font container mx-auto'>
        <div className='flex flex-row justify-between p-6'>
          <Link to='/rooms' className='btn btn-outline btn-primary'>
            All Rooms
          </Link>
        </div>
        <motion.ul
          className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-6'
          variants={motionCardContainer}
          initial='hidden'
          animate='visible'
        >
          {data.rooms.map((room) => (
            <RoomCardItem room={room} key={room.id} />
          ))}
        </motion.ul>
      </section>
    </>
  );
}
