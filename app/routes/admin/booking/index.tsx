import { Booking, Room, User } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { getAllBookings } from '~/utils/queries.server';
import AdminBookingTable from '~/components/admin/AdminBookingTable';

type LoaderData = {
  bookings: (Booking & { room: Room; user: User })[];
};

export const loader: LoaderFunction = async () => {
  const bookings = await getAllBookings();

  return { bookings };
};

export default function AdminBookings() {
  const data = useLoaderData<LoaderData>();

  return (
    <section className='p-10 h-screen'>
      {data.bookings && data.bookings.length > 0 ? (
        <AdminBookingTable bookings={data.bookings} />
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
