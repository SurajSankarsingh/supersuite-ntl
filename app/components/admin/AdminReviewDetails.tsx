import { AdminReviewDetailsProps } from '../types';

export default function AdminReviewDetails({
  review,
}: AdminReviewDetailsProps) {
  return (
    <section className='p-8'>
      <div className='container px-5 py-16 mx-auto'>
        <h1 className='text-3xl font-semibold mb-4'>Review Info:</h1>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>Review Comment:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>{review?.comment}</span>
        </p>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>Review Rating:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>{review?.rating}</span>
        </p>
      </div>

      <div className='container px-5 py-16 mx-auto'>
        <h1 className='text-3xl font-semibold mb-4'>Room Info:</h1>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>Room Name:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>
            {review?.room?.name}
          </span>
        </p>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>Room Number:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>
            {review?.room?.room_num}
          </span>
        </p>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>Room Price Per Night:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>
            $ {review?.room?.price_per_night}
          </span>
        </p>
      </div>

      <div className='container px-5 py-16 mx-auto'>
        <h1 className='text-3xl font-semibold mb-4'>User Info:</h1>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>User Name:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>
            {review?.user.username}
          </span>
        </p>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>User Email:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>
            {review?.user.email}
          </span>
        </p>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>User Role:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>
            {review?.user.role}
          </span>
        </p>
      </div>
    </section>
  );
}
