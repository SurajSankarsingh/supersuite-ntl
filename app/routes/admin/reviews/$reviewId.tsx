import type { Review, Room, User } from '@prisma/client';
import { Link, Form, useLoaderData } from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import AdminReviewDetails from '~/components/admin/AdminReviewDetails';
import { deleteReview } from '~/utils/mutations.server';
import { getReviewById } from '~/utils/queries.server';

type LoaderData = {
  review: (Review & { user: User; room: Room | null }) | null;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { reviewId } = params;

  invariant(reviewId, 'Expected reviewId');

  const review = await getReviewById(reviewId);
  if (!review) throw new Error('Review not found');

  const data: LoaderData = {
    review,
  };

  return data;
};

export const action: ActionFunction = async ({ params }) => {
  const { reviewId } = params;
  invariant(reviewId, 'Expected reviewId');

  await deleteReview(reviewId);

  return redirect('/admin/reviews');
};

export default function AdminReviews() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <AdminReviewDetails review={data.review} />
      <div className='flex flex-row justify-center'>
        <Link to='/admin/reviews' className='btn btn-outline btn-accent mr-4'>
          Back to All Reviews
        </Link>
        <Form method='post'>
          <button type='submit' className='btn btn-outline btn-error'>
            Delete Review
          </button>
        </Form>
      </div>
    </>
  );
}
