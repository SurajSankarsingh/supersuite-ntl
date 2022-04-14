import type { AdminReviewTableProps } from '../types';
import { formatDate } from '~/lib/formatDate';
import { Link } from '@remix-run/react';

export default function AdminReviewTable({ reviews }: AdminReviewTableProps) {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full table-normal'>
        <thead>
          <tr className='text-slate-200'>
            <th></th>
            <th>Comment</th>
            <th>Rating</th>
            <th>Room Number</th>
            <th>User Name</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => {
            const createdOn = formatDate(review.createdAt.toString());

            return (
              <>
                <tr className='hover text-slate-200' key={review.id}>
                  <th>
                    <Link to={`/admin/reviews/${review.id}`}>
                      <span className='mr-4 uppercase text-sm'>Details</span>
                      <i className='fa-solid fa-angle-right text-cyan-500'></i>
                    </Link>
                  </th>
                  <td>{review.comment}</td>
                  <td>{review.rating}</td>
                  <td>{review.room?.room_num}</td>
                  <td>{review.user.username}</td>
                  <td>{createdOn}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
