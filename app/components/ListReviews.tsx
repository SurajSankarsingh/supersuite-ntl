import { Review } from '@prisma/client';

type Props = {
  reviews: Review[];
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  } | null;
};

export default function ListReviews({ reviews, user }: Props) {
  return (
    <>
      <div className='reviews w-75'>
        <h3>Reviews:</h3>
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
                <p className='review_user'>by {user?.username}</p>
                <p className='review_comment'>{review.comment}</p>

                <hr />
              </div>
            );
          })}
      </div>
    </>
  );
}
