import { Booking, Room } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { getBookingByUser } from '~/utils/queries.server';
import { getUser } from '~/utils/session.server';
import BookingTable from '../../../components/BookingTable';

type LoaderData = {
  bookings: (Booking & { room: Room })[];
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const userId = user?.id;

  const bookings = await getBookingByUser(userId);

  return { bookings };
};

export default function MyBookings() {
  const data = useLoaderData<LoaderData>();

  return (
    <section className='p-10 h-screen'>
      {data.bookings && data.bookings.length > 0 ? (
        <BookingTable bookings={data.bookings} />
      ) : (
        <div className='text-center'>
          <h1>
            Oh snap!!, you have no bookings at this time! Please create one!
          </h1>
        </div>
      )}
    </section>
  );
}
