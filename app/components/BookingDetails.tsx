import { Link } from 'remix';
import { formatDate } from '~/lib/formatDate';
import type { BookingDetailsProps } from './types';

export default function BookingDetails({ booking }: BookingDetailsProps) {
  const checkInDate = formatDate(booking!.checkInDate);
  const checkOutDate = formatDate(booking!.checkOutDate);

  return (
    <section className='p-8'>
      <div className='container px-5 py-24 mx-auto'>
        <hr />
        <h2 className='sm:text-3xl text-2xl font-medium title-font mb-8 mt-2'>
          User Info:
        </h2>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>Name:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>
            {booking?.user?.username}
          </span>
        </p>
        <p className='text-base leading-relaxed mt-2 mb-4'>
          <b>Email:</b>
          <span className='ml-2 text-cyan-500 text-lg'>
            {booking?.user?.email}
          </span>
        </p>

        <hr />

        <h4 className='sm:text-3xl text-2xl font-medium title-font mb-8 mt-2'>
          Booking Info:
        </h4>
        <p className='text-base leading-relaxed mt-2'>
          <b>Check In:</b>
          <span className='ml-2 text-cyan-500 text-lg'>{checkInDate}</span>
        </p>

        <p className='text-base leading-relaxed mt-2'>
          <b>Check Out:</b>
          <span className='ml-2 text-cyan-500 text-lg'>{checkOutDate}</span>
        </p>

        <p className='text-base leading-relaxed mt-2 mb-4'>
          <b>Days of Stay:</b>
          <span className='ml-2 text-cyan-500 text-lg'>
            {booking?.daysOfStay}
          </span>
        </p>

        <hr />

        <h4 className='sm:text-3xl text-2xl font-medium title-font mb-8 mt-2'>
          Payment Status:
        </h4>

        <p className='text-base leading-relaxed mt-2 mb-4'>
          <b>Amount:</b>
          <span className='ml-2 text-cyan-500 text-lg'>
            ${booking?.amountPaid}
          </span>
        </p>
        {/* <p className={isPaid ? 'greenColor' : 'redColor'}>
                <b>{isPaid ? 'Paid' : 'Not Paid'}</b>
              </p> */}

        {/* {user && user.role === 'admin' && (
                <>
                  <h4 className='my-4'>Stripe Payment ID</h4>
                  <p className='redColor'>
                    <b>{booking.paymentInfo.id}</b>
                  </p>
                </>
              )} */}

        <hr />
        <h4 className='sm:text-3xl text-2xl font-medium title-font mb-8 mt-2'>
          Booked Room:
        </h4>

        <div className='p-4 md:w-1/3 sm:mb-0 mb-6'>
          <div className='rounded-lg h-64 overflow-hidden'>
            <img
              src={booking?.room.images[0].url}
              alt={booking?.room.name}
              height={500}
              width={500}
              className='object-cover object-center h-full w-full'
            />
          </div>

          <div className='text-3xl title-font mt-5 ml-2 text-cyan-500 font-semibold italic font-serif'>
            <Link to={`/rooms/${booking?.room.id}`}>{booking?.room.name}</Link>
          </div>

          <div className='text-base leading-relaxed mt-2'>
            <p className='ml-2 text-cyan-500 text-lg'>
              Room #: {booking?.room.room_num}
            </p>
          </div>

          <div className='text-base leading-relaxed mt-2'>
            <p className='ml-2 text-cyan-500 text-lg'>
              ${booking?.room.price_per_night} / night
            </p>
          </div>
          <div className='text-base leading-relaxed mt-2'>
            <p className='ml-2 text-cyan-500 text-lg'>
              {booking?.daysOfStay} Day(s)
            </p>
          </div>
        </div>
        <hr />
      </div>
    </section>
  );
}
