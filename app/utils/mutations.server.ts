import { db } from '~/utils/db.server';

export async function createReview(data: {
  name: string;
  rating: number;
  comment: string;
  roomId: string;
  userId: string;
}) {
  let review = await db.review.create({
    data,
  });

  return review;
}

export async function createBooking(data: {
  userId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  daysOfStay: number;
  amountPaid: number;
  paidAt: Date;
}) {
  let booking = await db.booking.create({
    data,
  });

  return booking;
}

export async function getBookedDates(roomId: string) {
  let bookedDates = await db.booking.findFirst({
    where: {
      roomId,
    },
    select: {
      checkInDate: true,
      checkOutDate: true,
    },
  });

  return bookedDates;
}
