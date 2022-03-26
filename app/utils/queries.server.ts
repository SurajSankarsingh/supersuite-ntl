import { db } from '~/utils/db.server';

export async function getFeaturedRooms() {
  let rooms = await db.room.findMany({
    where: {
      featured: true,
    },
    include: {
      reviews: true,
    },
  });

  return rooms;
}

export async function getAllRooms() {
  let rooms = await db.room.findMany({
    include: {
      reviews: true,
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
    },
  });

  return room;
}

export async function getBookedDates(roomId: string) {
  let bookedDates = await db.booking.findMany({
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
