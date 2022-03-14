import { Room } from '@prisma/client';

type Props = {
  room: Room;
};

export default function RoomAmenities({ room }: Props) {
  return (
    <div className='flex flex-col mt-5 w-1/2'>
      <h3 className='mb-4'>Features:</h3>
      <div className='flex mb-2'>
        <i className='fa-solid fa-users' aria-hidden='true'></i>
        <p className='ml-4'>Guests: {room.capacity}</p>
      </div>
      <div className='flex mb-2'>
        <i className='fa-solid fa-bed' aria-hidden='true'></i>
        <p className='ml-4'>Number of Beds: {room.beds}</p>
      </div>
      <div className='flex mb-2'>
        <i className='fa-solid fa-bed-pulse' aria-hidden='true'></i>
        <p className='ml-4'>Bed Type: {room.category}</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.wifi ? 'fa fa-check text-success' : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>Wifi</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.kitchenette
              ? 'fa fa-check text-success'
              : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>Kitchenette</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.cleaning
              ? 'fa fa-check text-success'
              : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>Cleaning</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.air_conditioning
              ? 'fa fa-check text-success'
              : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>Air Conditioning</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.pets ? 'fa fa-check text-success' : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>Pets</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.tv ? 'fa fa-check text-success' : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>TV</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.breakfast
              ? 'fa fa-check text-success'
              : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>Breakfast</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.entertainment
              ? 'fa fa-check text-success'
              : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>Entertainment</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.refrigerator
              ? 'fa fa-check text-success'
              : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>Refrigerator</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.safe ? 'fa fa-check text-success' : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>Safe</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.clothing_care
              ? 'fa fa-check text-success'
              : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>Clothing Care</p>
      </div>
      <div className='flex mb-2'>
        <i
          className={
            room.swimming_pool
              ? 'fa fa-check text-success'
              : 'fa fa-times text-error'
          }
          aria-hidden='true'
        ></i>
        <p className='ml-4'>Swimming Pool</p>
      </div>
    </div>
  );
}
