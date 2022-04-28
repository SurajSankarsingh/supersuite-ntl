import type { AdminRoomDetailsProps } from '../types';
import RoomAmenities from '../RoomAmenities';
import Image from '~/components/image';
import { useState } from 'react';

export default function AdminRoomDetails({ room }: AdminRoomDetailsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  let count = 0;

  const handleRightClick = () => {
    count = (count + 1) % room.images.length;
    setCurrentIndex(count);
  };
  const handleLeftClick = () => {
    const arrayLength = room.images.length;
    count = (currentIndex + arrayLength - 1) % arrayLength;
    setCurrentIndex(count);
  };

  return (
    <section className='p-8'>
      <div className='container px-5 py-16 mx-auto'>
        <h1 className='text-3xl font-semibold mb-4'>Room Info:</h1>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>Room Name:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>{room.name}</span>
        </p>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>Room Number:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>{room.room_num}</span>
        </p>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>Room Description:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>{room.description}</span>
        </p>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>Number of Beds:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>{room.beds}</span>
        </p>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>Number of Bathrooms:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>{room.bathrooms}</span>
        </p>
        <div className='max-w-screen-xl m-auto mt-4'>
          <div className='w-full relative select-none'>
            <div className='aspect-auto'>
              <Image
                src={room.images[currentIndex]}
                alt={room.name}
                height={500}
                width={1500}
                className='object-cover object-center  rounded-md'
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
        <RoomAmenities room={room} />
      </div>
    </section>
  );
}
