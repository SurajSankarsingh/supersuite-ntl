import RoomCardItem from '~/components/RoomCardItem';
import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { db } from '~/utils/db.server';
import { Room, Review } from '@prisma/client';
import { motion } from 'framer-motion';
import { motionCardContainer } from '~/framer';

type LoaderData = {
  rooms: (Room & { reviews: Review[] })[];
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    rooms: await db.room.findMany({
      include: {
        reviews: true,
      },
    }),
  };
  return data;
};

export default function AllRooms() {
  const data = useLoaderData<LoaderData>();
  return (
    <section className='body-font container mx-auto'>
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
  );
}
