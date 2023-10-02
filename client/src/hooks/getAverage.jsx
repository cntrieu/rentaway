import { useState, useEffect } from 'react';

export const GetAverage = (retrieveReviews) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const ratings = retrieveReviews.map((review) => review.rating);
    const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);

    if (ratings.length === 0) {
      setAverageRating(0);
    } else {
      setAverageRating(totalRating / ratings.length);
    }
  }, [retrieveReviews]);

  return averageRating;
};
