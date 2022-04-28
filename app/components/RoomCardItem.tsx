import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import type { RoomCardItemProps } from '~/components/types';
import { motionCardItem } from '~/framer';
import Image from '~/components/image';

export default function RoomCardItem({ room }: RoomCardItemProps) {
  const numOfReviews = room.reviews.length;

  const averageRating =
    room.reviews.reduce(
      (acc: any, curr: { rating: any }) => acc + curr.rating,
      0
    ) / numOfReviews;

  return (
    <>
      <motion.li className='card max-w-5xl shadow-xl' variants={motionCardItem}>
        <figure>
          <div className='relative'>
            <div className='block overflow-hidden group rounded-sm'>
              <Image
                src={room.images[0]}
                alt={room.name}
                className='object-cover h-56 transition-all duration-300 ease-out sm:h-64 group-hover:scale-110'
                width={800}
                fit='cover'
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
          <div className='badge badge-outline badge-success font-semibold'>
            ${room.price_per_night} - Price Per Night
          </div>
          {averageRating && averageRating > 0 ? (
            <div className='badge badge-outline badge-accent mt-4'>
              {averageRating.toFixed(1)}
              <i className='mx-2 fas fa-star'></i> - Rating
            </div>
          ) : (
            <div className='badge badge-outline badge-primary mt-4'>
              0<i className='mx-2 fas fa-star'></i> - Rating
            </div>
          )}

          {numOfReviews === 1 ? (
            <span className='mt-4'>({numOfReviews} Review)</span>
          ) : (
            <span className='mt-4'>({numOfReviews} Reviews)</span>
          )}
        </div>
        <div className='justify-center card-actions mb-4'>
          <Link
            to={`/rooms/${room.id}`}
            className='btn btn-primary btn-outline'
            prefetch='intent'
          >
            More info
          </Link>
        </div>
      </motion.li>
    </>
  );
}
