import { Review, Room } from '@prisma/client';
import { useState } from 'react';
import { Link, LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import { db } from '~/utils/db.server';
import { motion } from 'framer-motion';
import { motionPageContainer, motionPageItem } from '../../framer/index';
import RoomAmenities from '~/components/RoomAmenities';

type LoaderData = {
  room: Room;
  reviews: Review[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const room = await db.room.findUnique({
    where: {
      id: params.roomId,
    },
  });
  if (!room) throw new Error('Room not found');

  const reviews = await db.review.findMany({
    where: {
      roomId: params.roomId,
    },
  });
  if (!reviews) throw new Error('No reviews found for this room');

  const data: LoaderData = { room, reviews };
  return data;
};

export default function RoomRoute() {
  const data = useLoaderData<LoaderData>();
  const [currentIndex, setCurrentIndex] = useState(0);

  let count = 0;

  const handleRightClick = () => {
    count = (count + 1) % data.room.images.length;
    setCurrentIndex(count);
  };
  const handleLeftClick = () => {
    const arrayLength = data.room.images.length;
    count = (currentIndex + arrayLength - 1) % arrayLength;
    setCurrentIndex(count);
  };

  return (
    <>
      <motion.div
        className='container px-5 py-24 mx-auto max-w-7xl'
        variants={motionPageContainer}
        initial='beginning'
        animate='final'
        exit='exit'
      >
        <div className='flex flex-col w-full  mb-20'>
          <div className='flex flex-col items-start'>
            <motion.div variants={motionPageItem}>
              <h2 className='mb-5 font-semibold text-2xl'>{data.room.name}</h2>
            </motion.div>
            <motion.div variants={motionPageItem}>
              <p>Room #: {data.room.room_num}</p>
            </motion.div>
            <motion.div variants={motionPageItem}>
              <div className='badge text-teal-600 badge-outline mt-4'>
                {data.room.ratings} <i className='mx-2 fas fa-star'></i> -
                Rating
              </div>
            </motion.div>
            <motion.div variants={motionPageItem} className='my-4'>
              <span>({data.room.num_of_reviews} Reviews)</span>
            </motion.div>
          </div>

          <div className='max-w-screen-xl m-auto'>
            <div className='w-full relative select-none'>
              <div className='aspect-auto'>
                <img
                  className='w-full rounded-md'
                  src={data.room.images[currentIndex]}
                  alt={data.room.name}
                />
              </div>
              <div className='absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3'>
                <button onClick={handleLeftClick} className='btn btn-circle'>
                  ❮
                </button>
                <button onClick={handleRightClick} className='btn btn-circle'>
                  ❯
                </button>
              </div>
            </div>
          </div>

          <div className='flex flex-row my-6'>
            <div className='flex flex-wrap justify-start items-start'>
              <h3 className='font-semibold text-2xl my-4'>Description</h3>
              <p className=''>{data.room.description}</p>
            </div>
          </div>
          <div className='flex flex-row'>
            <RoomAmenities room={data.room} />

            <div className='flex flex-col my-6 w-1/2'>
              <div className='flex flex-row justify-center mt-6'>
                <div className='shadow-lg p-4 bg-slate-200 dark:bg-slate-800 rounded-md'>
                  <div className='divide-y divide-slate-400'>
                    <p>
                      <b>${data.room.price_per_night}</b> / night
                    </p>
                    <p className='mt-6 mb-3'>Pick Check In & Check Out Date</p>
                  </div>
                  {/* 
              <DatePicker
                className='w-100'
                selected={checkInDate}
                onChange={onChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
              /> */}
                  {/* {available === true && (
                <div className='alert alert-success my-3 font-weight-bold'>
                  Room is available. Book now.
                </div>
              )}
              {available === false && (
                <div className='alert alert-danger my-3 font-weight-bold'>
                  Room not available. Try different dates.
                </div>
              )}
              {available && !user && (
                <div className='alert alert-danger my-3 font-weight-bold'>
                  Login to book room.
                </div>
              )}
              {available && user && (
                <button
                  className='btn btn-block py-3 booking-btn'
                  onClick={() => bookRoom(room._id, room.pricePerNight)}
                  disabled={bookingLoading || paymentLoading ? true : false}
                >
                  Pay - ${daysOfStay * room.pricePerNight}
                </button>
              )} */}
                </div>
              </div>
            </div>
          </div>
          {/* <NewReview /> */}

          {data.reviews && data.reviews.length > 0 ? (
            // <ListReviews reviews={data.reviews} />
            <p>Reviews go here</p>
          ) : (
            <p>
              <b>No Reviews on this room. Be the first to add a review!!</b>
            </p>
          )}
        </div>
        <Link to='/rooms' className='btn btn-outline btn-accent'>
          All Rooms
        </Link>
      </motion.div>
    </>
  );
}
