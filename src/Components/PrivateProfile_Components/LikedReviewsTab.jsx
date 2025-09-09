import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LikedReviewsTab = ({ likedReviews }) => {

  const user = useSelector(state => state.auth.user);

  if (!likedReviews || likedReviews.length === 0) {
    return <p className="text-center text-gray-400">No liked reviews yet.</p>;
  }

  return (
    <div className="space-y-6">
      {likedReviews.map((review) => (
        <div
          key={review.reviewId}
          className="bg-gray-900/80 p-6 rounded-xl shadow-lg text-white"
        >
          {/* Movie Info */}
          <Link to={`/movie/${review.movieId}`}>
                <h3 className="text-lg font-bold mb-2 text-green-400">{review.movieName}</h3>
          </Link>
          {/* Review Text */}
          <p className="italic text-gray-300 mb-4">"{review.review}"</p>

          {/* Reviewer */}
          <div className="text-sm text-gray-400">
            <Link to={user?.username === review.reviewerUsername? `/${review.reviewerUsername}` : `/public-profile/${review.reviewerUsername}`}>
                <span className="text-blue-400">Reviewer: @{review.reviewerUsername}</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikedReviewsTab;
