import type { Review, Room, User } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAllReviews } from '~/utils/queries.server';
import AdminReviewTable from '../../../components/admin/AdminReviewTable';

type LoaderData = {
  reviews: (Review & { user: User; room: Room | null })[];
};

export const loader: LoaderFunction = async () => {
  const reviews = await getAllReviews();

  const data: LoaderData = {
    reviews,
  };

  return data;
};

export default function AdminReviews() {
  const data = useLoaderData<LoaderData>();

  return (
    <section className='p-10 h-screen'>
      <div>
        {data.reviews && data.reviews.length > 0 ? (
          <AdminReviewTable reviews={data.reviews} />
        ) : (
          <div className='text-center'>
            <h1>
              Oh snap!!, there are no rooms created at this time. Please create
              one!
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}
