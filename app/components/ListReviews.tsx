import type { ListReviewProps } from '~/components/types';

export default function ListReviews({ reviews }: ListReviewProps) {
  return (
    <>
      <div className='reviews w-75 '>
        <h3 className='text-lg italic font-semibold mb-4'>Reviews:</h3>
        <hr />

        {reviews &&
          reviews.map((review) => {
            const ratingArray = Array.from(
              { length: review.rating },
              (v, i) => i
            );

            return (
              <div key={review.id} className='review-card my-3'>
                <div className='rating'>
                  {ratingArray.map((j) => (
                    <input
                      type='radio'
                      name='rating-2'
                      key={j}
                      className={`mask mask-star-2 bg-orange-400 cursor-default`}
                      disabled
                      checked
                    />
                  ))}
                </div>
                <p className='my-2 italic'>by {review.name}</p>
                <p className='my-2 text-md'>{review.comment}</p>

                <hr />
              </div>
            );
          })}
      </div>
    </>
  );
}
