import { getDates } from '~/lib/getDates';
import { db } from '~/utils/db.server';

export async function getFeaturedRooms() {
  let rooms = await db.room.findMany({
    where: {
      featured: true,
    },
    include: {
      reviews: true,
      images: true,
    },
  });

  return rooms;
}

export async function getAllRooms() {
  let rooms = await db.room.findMany({
    include: {
      reviews: true,
      images: true,
    },
  });
  return rooms;
}

export async function getRoomById(roomId: string) {
  let room = await db.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      reviews: true,
      images: true,
    },
  });

  return room;
}

export async function getBookedDates(roomId: string) {
  let bookings = await db.booking.findMany({
    where: {
      roomId,
    },
  });

  let bookedDates: Date[] = [];

  bookings.forEach((booking) => {
    const startDate = new Date(booking.checkInDate);
    const endDate = new Date(booking.checkOutDate);
    const dates = getDates(startDate, endDate);

    bookedDates = bookedDates.concat(dates);
  });

  return bookedDates;
}

export async function getAllBookings() {
  let bookings = await db.booking.findMany({
    include: {
      room: true,
      user: true,
    },
  });

  return bookings;
}

export async function getBookingByUser(userId: string | undefined) {
  let bookings = await db.booking.findMany({
    where: {
      userId,
    },
    include: {
      room: true,
      user: true,
    },
  });

  return bookings;
}

export async function getBookingById(bookingId: string | undefined) {
  let booking = await db.booking.findFirst({
    where: {
      id: bookingId,
    },
    include: {
      room: {
        include: {
          images: true,
        },
      },
      user: true,
    },
  });

  return booking;
}

export async function getAllUsers() {
  let users = await db.user.findMany();

  return users;
}

export async function getUserById(userId: string | undefined) {
  let user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}

export async function getAllReviews() {
  let reviews = await db.review.findMany({
    include: {
      room: true,
      user: true,
    },
  });

  return reviews;
}

export async function getReviewById(reviewId: string | undefined) {
  let review = await db.review.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      room: true,
      user: true,
    },
  });

  return review;
}
