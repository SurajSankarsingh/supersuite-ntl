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

export async function createRoom(data: {
  userId: string;
  name: string;
  room_num: number;
  price_per_night: number;
  capacity: number;
  description: string;
  beds: number;
  category: string;
  bathrooms: number;
  featured: boolean;
  wifi: boolean;
  kitchenette: boolean;
  cleaning: boolean;
  air_conditioning: boolean;
  pets: boolean;
  tv: boolean;
  breakfast: boolean;
  entertainment: boolean;
  refrigerator: boolean;
  safe: boolean;
  clothing_care: boolean;
  swimming_pool: boolean;
  images: string[];
}) {
  let room = await db.room.create({
    data,
  });

  return room;
}

export async function deleteBooking(bookingId: string) {
  let booking = await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  return booking;
}

export async function deleteRoom(roomId: string) {
  let room = await db.room.delete({
    where: {
      id: roomId,
    },
  });

  return room;
}

export async function deleteUser(userId: string) {
  let user = await db.user.delete({
    where: {
      id: userId,
    },
  });

  return user;
}

export async function deleteReview(reviewId: string) {
  let review = await db.review.delete({
    where: {
      id: reviewId,
    },
  });

  return review;
}
