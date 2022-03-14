import { Room } from '@prisma/client';
import { Link } from 'remix';
import { motion } from 'framer-motion';
import { motionCardItem } from '~/framer';

type Props = {
  room: Room;
};

export default function RoomCardItem({ room }: Props) {
  return (
    <>
      <motion.li
        className='card card-bordered shadow-lg'
        variants={motionCardItem}
      >
        <figure>
          <div className='relative'>
            <div className='block overflow-hidden group rounded-xl'>
              <img
                src={room.images[0]}
                alt={room.name}
                className='object-cover w-full h-56 transition-all duration-300 ease-out sm:h-64 group-hover:scale-110'
              />
            </div>
          </div>
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>
            <Link to={`/rooms/${room.id}`} prefetch='intent'>
              {room.name}
            </Link>
          </h2>
          <div className='badge badge-outline badge-accent font-semibold'>
            ${room.price_per_night} - Price Per Night
          </div>
          <div className='badge badge-outline badge-accent mt-4'>
            {room.ratings} <i className='mx-2 fas fa-star'></i> - Rating
          </div>
          <span className='mt-4'>({room.num_of_reviews} Reviews)</span>
          <p></p>
        </div>
        <div className='justify-center card-actions mb-4'>
          <Link
            to={`/rooms/${room.id}`}
            className='btn btn-outline btn-accent'
            prefetch='intent'
          >
            More info
          </Link>
        </div>
      </motion.li>
    </>
  );
}
