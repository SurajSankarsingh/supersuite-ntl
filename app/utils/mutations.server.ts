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
