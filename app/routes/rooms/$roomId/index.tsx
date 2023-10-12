import type { Review, Room } from '@prisma/client';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Form, Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { getRoomById, getBookedDates } from '~/utils/queries.server';
import { getUser } from '~/utils/session.server';
import { createBooking } from '~/utils/mutations.server';
import { getDates } from '~/lib/getDates';

type LoaderData = {
  room: Room & { reviews: Review[] };
  user: Awaited<ReturnType<typeof getUser>>;
  bookedDates: any[];
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

  const bookedDates = await getBookedDates(roomId);

  const data: LoaderData = { room, user, bookedDates };
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
  const [available, setAvailable] = useState(true);

  const onChange = (dates: [Date, Date]) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      // Calclate days of stay
      const days = Math.floor(
        (checkOutDate.getTime() - checkInDate.getTime()) / 86400000 + 1
      );
      setDaysOfStay(days);
    }
  };

  const checkInDateString = checkInDate?.toISOString();
  const checkOutDateString = checkOutDate?.toISOString();

  const excludedDates = data?.bookedDates.map((date) => new Date(date));

  useEffect(() => {
    let chosenDates: Date[] = [];

    const selectedDates = [{ checkInDate, checkOutDate }];

    selectedDates.forEach((date) => {
      const startDate = new Date(date.checkInDate);
      const endDate = new Date(date.checkOutDate);
      const dates = getDates(startDate, endDate);

      chosenDates = chosenDates.concat(dates);
    });

    for (let i = 0; i < chosenDates.length; i++) {
      for (let j = 0; j < excludedDates.length; j++) {
        if (
          chosenDates[i].toLocaleDateString() ===
          excludedDates[j].toLocaleDateString()
        ) {
          setAvailable(false);
          return;
        } else {
          setAvailable(true);
        }
      }
    }
  }, [checkInDate, checkOutDate, excludedDates]);

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
          <div className='flex justify-center'>
            <DatePicker
              selected={checkInDate}
              onChange={onChange}
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={new Date()}
              excludeDates={excludedDates}
              selectsRange
              inline
            />
          </div>

          {available === true && (
            <div className='alert alert-success my-3 font-weight-bold'>
              Room is available. Book now.
            </div>
          )}
          {available === false && (
            <div className='alert alert-error my-3 font-weight-bold'>
              Room not available. <br />
              Please try different dates.
            </div>
          )}
          {available && !data.user && (
            <div className='alert alert-error my-3 font-weight-bold'>
              Please login to book room.
            </div>
          )}
          {available && data.user && (
            <>
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
                <p className='text-xs my-2'>
                  Book Now & Pay Later allows you book a room now and pay when
                  checking in. If you do not check in or notify us to cancel
                  your booking at least 5 days prior to the check in date, an
                  invoice would be sent via email in the sum of $
                  {((daysOfStay * data.room.price_per_night) / 2).toFixed(2)}.
                </p>
                <button
                  className='btn btn-block btn-outline btn-success py-3'
                  type='submit'
                  disabled={daysOfStay < 1}
                >
                  Book Now & Pay Later - $
                  {(daysOfStay * data.room.price_per_night).toFixed(2)}
                </button>
              </Form>

              {/* <Link to='/pay'>
                <button
                  className='btn btn-outline btn-success btn-block mt-4'
                  type='submit'
                  disabled={daysOfStay < 1}
                >
                  Pay with Credit Card
                </button>
              </Link> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
