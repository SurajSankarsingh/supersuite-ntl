import type { Booking, Room, User, Image } from '@prisma/client';
import { useLoaderData, Form, Link } from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import BookingDetails from '~/components/BookingDetails';
import { deleteBooking } from '~/utils/mutations.server';
import { getBookingById } from '~/utils/queries.server';
import invariant from 'tiny-invariant';

type LoaderData = {
  booking: Booking & { room: Room & { images: Image[] }; user: User };
};

export const loader: LoaderFunction = async ({ params }) => {
  const { bookingId } = params;

  const booking = await getBookingById(bookingId);
  if (!booking) throw new Error('Booking not found');

  const data: LoaderData = { booking };

  return data;
};

export const action: ActionFunction = async ({ params }) => {
  const { bookingId } = params;
  invariant(bookingId, 'Expected bookingId');

  await deleteBooking(bookingId);

  return redirect('/admin/bookings');
};

export default function BookingDetail() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <BookingDetails booking={data.booking} />
      <div className='flex flex-row justify-center'>
        <Link to='/admin/bookings' className='btn btn-outline btn-accent mr-4'>
          Back to All Bookings
        </Link>
        <Form method='post'>
          <button type='submit' className='btn btn-outline btn-error'>
            Delete Booking
          </button>
        </Form>
      </div>
    </>
  );
}
