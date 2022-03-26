import { Review, Room } from '@prisma/client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from 'remix';
import invariant from 'tiny-invariant';
import { getRoomById } from '~/utils/queries.server';
import { getUser } from '~/utils/session.server';
import { createBooking } from '~/utils/mutations.server';

type LoaderData = {
  room: Room & { reviews: Review[] };
  user: Awaited<ReturnType<typeof getUser>>;
};

async function redirectToOrigin(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
  throw redirect(`/login?${searchParams}`);
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const user = await getUser(request);
  const { roomId } = params;
  invariant(roomId, 'Expected roomId');

  const room = await getRoomById(roomId);
  if (!room) throw new Error('Room not found');

  const data: LoaderData = { room, user };
  return data;
};

export const action: ActionFunction = async ({ request, params }) => {
  const user = await getUser(request);
  if (!user?.id) {
    return redirectToOrigin(request);
  }

  const result = await request.formData();
  const checkInDateRaw = result.get('checkInDateString');
  const checkOutDateRaw = result.get('checkOutDateString');
  const daysOfStayRaw = result.get('daysOfStay');

  // const checkInDate = new Date(checkInDateString);
  // const checkOutDate = new Date(checkOutDateString);
  const daysOfStay = Number(daysOfStayRaw);
  const checkInDate = String(checkInDateRaw);
  const checkOutDate = String(checkOutDateRaw);

  const { roomId } = params;
  invariant(roomId, 'Expected roomId');

  const bookingData = {
    checkInDate,
    checkOutDate,
    daysOfStay,
    roomId,
    userId: user.id,
    amountPaid: 0.0,
    paidAt: new Date(),
  };

  const booking = await createBooking(bookingData);

  return { booking };
};

export default function RoomBooking() {
  const data = useLoaderData<LoaderData>();

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [daysOfStay, setDaysOfStay] = useState(0);

  const onChange = (dates: [any, any]) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      // Calclate days of stay
      const days = Math.floor((checkOutDate - checkInDate) / 86400000 + 1);
      setDaysOfStay(days);
    }
  };

  console.log(checkInDate, checkOutDate, daysOfStay);

  const checkInDateString = checkInDate?.toISOString();
  const checkOutDateString = checkOutDate?.toISOString();

  return (
    <div className='flex flex-col my-6 w-1/2'>
      <div className='flex flex-row justify-center mt-6'>
        <div className='shadow-lg p-4 bg-slate-200 dark:bg-slate-800 rounded-md'>
          <div className='divide-y divide-slate-400'>
            <p>
              <b>${data.room.price_per_night}</b> / night
            </p>
            <p className='mt-6 mb-3'>Pick Check In & Check Out Date</p>
          </div>

          <DatePicker
            selected={checkInDate}
            onChange={onChange}
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={new Date()}
            selectsRange
            inline
          />

          {/* {available === true && (
                <div className='alert alert-success my-3 font-weight-bold'>
                  Room is available. Book now.
                </div>
              )}
              {available === false && (
                <div className='alert alert-danger my-3 font-weight-bold'>
                  Room not available. Try different dates.
                </div>
              )} */}
          {!data.user && (
            <div className='alert alert-danger my-3 font-weight-bold'>
              Login to book room.
            </div>
          )}
          {data.user && (
            <Form method='post'>
              <input
                type='hidden'
                name='checkInDateString'
                value={checkInDateString}
              />
              <input
                type='hidden'
                name='checkOutDateString'
                value={checkOutDateString}
              />
              <input type='hidden' name='daysOfStay' value={daysOfStay} />
              <button
                className='btn btn-block py-3 booking-btn'
                type='submit'
                // disabled={bookingLoading || paymentLoading ? true : false}
              >
                Pay - ${(daysOfStay * data.room.price_per_night).toFixed(2)}
              </button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
