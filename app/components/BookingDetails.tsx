import { Link } from 'remix';
import { formatDate } from '~/lib/formatDate';
import type { BookingDetailsProps } from './types';

export default function BookingDetails({ booking }: BookingDetailsProps) {
  const checkInDate = formatDate(booking!.checkInDate);
  const checkOutDate = formatDate(booking!.checkOutDate);

  return (
    <section className='container p-8'>
      <div className=''>
        <div className=''>
          <h4 className='mb-4'>User Info</h4>
          <p>
            <b>Name:</b> {booking?.user?.username}
          </p>
          <p>
            <b>Email:</b> {booking?.user?.email}
          </p>
          <p>
            <b>Amount:</b> ${booking?.amountPaid}
          </p>

          <hr />

          <h4 className='mb-4'>Booking Info</h4>
          <p>
            <b>Check In:</b> {checkInDate}
          </p>

          <p>
            <b>Check Out:</b> {checkOutDate}
          </p>

          <p>
            <b>Days of Stay:</b> {booking?.daysOfStay}
          </p>

          <hr />

          <h4 className='my-4'>Payment Status</h4>
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

          <h4 className='mt-5 mb-4'>Booked Room:</h4>

          <hr />
          <div className='cart-item my-1'>
            <div className='row my-5'>
              <div className='col-4 col-lg-2'>
                <img
                  src={booking?.room.images[0]}
                  alt={booking?.room.name}
                  height={500}
                  width={500}
                />
              </div>

              <div className='col-5 col-lg-5'>
                <Link to={`/rooms/${booking?.room.id}`}>
                  {booking?.room.name}
                </Link>
              </div>

              <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
                <p>${booking?.room.price_per_night}</p>
              </div>

              <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
                <p>{booking?.daysOfStay} Day(s)</p>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </section>
  );
}
