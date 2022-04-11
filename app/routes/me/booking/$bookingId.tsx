import { Booking, Room, User, Image } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import BookingDetails from '~/components/BookingDetails';
import { getBookingById } from '~/utils/queries.server';

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

export default function BookingDetail() {
  const data = useLoaderData<LoaderData>();

  return <BookingDetails booking={data.booking} />;
}
